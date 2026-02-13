import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
  BarChart3,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const adminNavItems = [
  { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { path: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
  { path: "/admin/subscribers", icon: Mail, label: "Subscribers" },
  { path: "/admin/services", icon: Sparkles, label: "Services" },
  { path: "/admin/therapists", icon: Users, label: "Therapists" },
  { path: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { path: "/admin/settings", icon: Settings, label: "Settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'sub_admin': return 'Sub-admin';
      case 'manager': return 'Manager';
      default: return 'User';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getProfilePicUrl = (profilePic?: string) => {
    if (!profilePic) return "";
    if (profilePic.startsWith("http")) return profilePic;
    const baseUrl = API_URL.replace("/api", "");
    return `${baseUrl}/${profilePic.replace(/^\/+/, "")}`;
  };

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-card transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo - Fixed at top */}
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b px-4">
          {!collapsed ? (
            <Link
              to="/"
              className="flex items-center gap-2 font-serif text-xl font-bold text-foreground"
            >
              <Sparkles className="h-6 w-6 text-primary" />
              <span>
                Tripod<span className="text-primary">.</span>
              </span>
            </Link>
          ) : (
            <Link to="/" className="mx-auto">
              <Sparkles className="h-6 w-6 text-primary" />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <div 
          ref={navRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,0,0,0.2) transparent'
          }}
        >
          <ul className="space-y-2">
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    } ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User section - Fixed at bottom */}
        <div className="flex-shrink-0 border-t p-4">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            {user?.profilePic ? (
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage
                  src={getProfilePicUrl(user.profilePic)}
                  alt={user?.name}
                  onError={(e) => {
                    console.error("Image failed to load");
                    e.currentTarget.src = "";
                  }}
                />
                <AvatarFallback>
                  {getInitials(user?.name || "A")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {getInitials(user?.name || 'A')}
              </div>
            )}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-muted-foreground capitalize truncate">
                  {user?.role ? getRoleLabel(user.role) : 'User'}
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut size={18} />
              <span className="truncate">Sign Out</span>
            </button>
          )}
          {collapsed && (
            <button
              onClick={handleLogout}
              className="mt-4 flex w-full justify-center rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="min-h-screen p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;