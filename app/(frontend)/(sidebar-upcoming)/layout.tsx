import SidebarShell from "@/components/SidebarShell";

export default function SidebarUpcomingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarShell filterType="upcoming">{children}</SidebarShell>;
}
