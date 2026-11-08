/** Primary navigation, shared by the header, mobile menu and footer. */
export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/** True when `pathname` is `href` or a page nested under it. Hash links never match. */
export function isActive(pathname: string | null, href: string): boolean {
  if (!pathname || href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
