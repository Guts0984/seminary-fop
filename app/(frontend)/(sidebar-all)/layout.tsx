import SidebarShell from "@/components/SidebarShell";

export default function SidebarAllLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarShell>{children}</SidebarShell>;
}
