import { getSupabaseAdmin } from "./db";

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  service: string;
  message: string;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
};

type NewLead = Omit<Lead, "id" | "status" | "notes" | "createdAt">;

function mapLead(row: Record<string, unknown>): Lead {
  return {
    id: String(row.id), name: String(row.name), company: row.company ? String(row.company) : null,
    email: String(row.email), service: String(row.service), message: String(row.message),
    status: row.status as LeadStatus, notes: row.notes ? String(row.notes) : null, createdAt: String(row.created_at),
  };
}

export async function createLead(lead: NewLead) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return false;
  const { error } = await supabase.from("leads").insert({
    name: lead.name, company: lead.company, email: lead.email, service: lead.service, message: lead.message,
  });
  if (error) throw error;
  return true;
}

export async function getLeads(limit = 100) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, leads: [] as Lead[] };
  const { data, error } = await supabase.from("leads").select("id,name,company,email,service,message,status,notes,created_at").order("created_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return { configured: true, leads: (data ?? []).map(mapLead) };
}

export async function getLead(id: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, lead: null as Lead | null };
  const { data, error } = await supabase.from("leads").select("id,name,company,email,service,message,status,notes,created_at").eq("id", id).maybeSingle();
  if (error) throw error;
  return { configured: true, lead: data ? mapLead(data) : null };
}

export async function getLeadStats() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { configured: false, total: 0, new: 0, contacted: 0, closed: 0 };
  const statuses: LeadStatus[] = ["new", "contacted", "closed"];
  const results = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    ...statuses.map((status) => supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", status)),
  ]);
  const failed = results.find((result) => result.error);
  if (failed?.error) throw failed.error;
  return { configured: true, total: results[0].count ?? 0, new: results[1].count ?? 0, contacted: results[2].count ?? 0, closed: results[3].count ?? 0 };
}
