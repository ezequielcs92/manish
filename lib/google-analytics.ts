import "server-only";
import { google } from "googleapis";

type Row = { label: string; value: number };

export type AnalyticsReport = {
  configured: boolean;
  summary: { activeUsers: number; sessions: number; pageViews: number; events: number };
  pages: Row[];
  channels: Row[];
  leads: number;
};

const emptyReport: AnalyticsReport = {
  configured: false,
  summary: { activeUsers: 0, sessions: 0, pageViews: 0, events: 0 },
  pages: [],
  channels: [],
  leads: 0,
};

function numberValue(value: { value?: string | null } | undefined) {
  return Number(value?.value ?? 0);
}

function rows(response: { data?: { rows?: Array<{ dimensionValues?: Array<{ value?: string | null }>; metricValues?: Array<{ value?: string | null }> }> } }) {
  return (response.data?.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value || "Sin datos",
    value: numberValue(row.metricValues?.[0]),
  }));
}

export async function getAnalyticsReport(): Promise<AnalyticsReport> {
  const propertyId = process.env.GA_PROPERTY_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!propertyId || !clientEmail || !privateKey) return emptyReport;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });
    const analytics = google.analyticsdata({ version: "v1beta", auth });
    const property = `properties/${propertyId}`;
    const dateRanges = [{ startDate: "30daysAgo", endDate: "today" }];
    const [summaryResponse, pagesResponse, channelsResponse, leadsResponse] = await Promise.all([
      analytics.properties.runReport({
        property,
        requestBody: { dateRanges, metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }, { name: "eventCount" }] },
      }),
      analytics.properties.runReport({
        property,
        requestBody: { dateRanges, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }], limit: "5", orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }] },
      }),
      analytics.properties.runReport({
        property,
        requestBody: { dateRanges, dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }], limit: "5", orderBys: [{ metric: { metricName: "sessions" }, desc: true }] },
      }),
      analytics.properties.runReport({
        property,
        requestBody: { dateRanges, dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: "generate_lead" } } } },
      }),
    ]);

    const summaryValues = summaryResponse.data.rows?.[0]?.metricValues ?? [];
    return {
      configured: true,
      summary: { activeUsers: numberValue(summaryValues[0]), sessions: numberValue(summaryValues[1]), pageViews: numberValue(summaryValues[2]), events: numberValue(summaryValues[3]) },
      pages: rows(pagesResponse),
      channels: rows(channelsResponse),
      leads: numberValue(leadsResponse.data.rows?.[0]?.metricValues?.[0]),
    };
  } catch {
    return { ...emptyReport, configured: true };
  }
}
