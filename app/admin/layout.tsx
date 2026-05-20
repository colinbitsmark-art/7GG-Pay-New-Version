import { StaffAdminShell } from "@/components/platform-components";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <StaffAdminShell>{children}</StaffAdminShell>;
}
