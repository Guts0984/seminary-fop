import SidebarShell from "@/components/SidebarShell";

export default function SidebarPastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarShell filterType="past">{children}</SidebarShell>;
}
