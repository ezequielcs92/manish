import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin-sidebar";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Admin Manish" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();
  return <div className="admin-shell"><AdminSidebar email={session.email} /><main className="admin-main">{children}</main></div>;
}
