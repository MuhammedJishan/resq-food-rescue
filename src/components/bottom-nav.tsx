import { Link, useRouterState } from "@tanstack/react-router";
import { Compass, Home, Leaf, Receipt, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/orders", label: "Orders", icon: Receipt },
  { to: "/impact", label: "Impact", icon: Leaf },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "fill-primary/15" : ""}`} strokeWidth={active ? 2.4 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/** Page container that leaves room for the bottom nav. */
export function Page({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto min-h-screen w-full max-w-md pb-24 ${className}`}>
      {children}
      <BottomNav />
    </div>
  );
}
