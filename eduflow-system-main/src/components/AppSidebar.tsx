import { NavLink, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  Bell,
  DollarSign,
  LogOut,
  GraduationCap,
  BarChart3,
  Settings,
  UserCheck,
  PlusCircle
} from "lucide-react";

// Professional Configuration as per your requirement
const navItems: Record<UserRole, any[]> = {
  admin: [
    { label: "Admin Dashboard", path: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Students Management", path: "/admin/students", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Teacher Management", path: "/admin/teachers", icon: <Users className="w-4 h-4" /> },
    { label: "Classes & Timetable", path: "/admin/classes", icon: <Calendar className="w-4 h-4" /> },
    { label: "Fee Records", path: "/admin/fees", icon: <DollarSign className="w-4 h-4" /> },
    { label: "System Reports", path: "/admin/reports", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Settings", path: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ],
  teacher: [
    { label: "Teacher Dashboard", path: "/teacher", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Mark Attendance", path: "/teacher/attendance", icon: <UserCheck className="w-4 h-4" /> },
    { label: "Upload Results", path: "/teacher/results", icon: <PlusCircle className="w-4 h-4" /> },
    { label: "My Timetable", path: "/teacher/timetable", icon: <Calendar className="w-4 h-4" /> },
    { label: "My Students", path: "/teacher/students", icon: <Users className="w-4 h-4" /> },
  ],
  student: [
    { label: "My Dashboard", path: "/student", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Attendance Report", path: "/student/attendance", icon: <ClipboardList className="w-4 h-4" /> },
    { label: "My Results", path: "/student/results", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Fee Status", path: "/student/fees", icon: <DollarSign className="w-4 h-4" /> },
    { label: "Class Timetable", path: "/student/timetable", icon: <Calendar className="w-4 h-4" /> },
  ],
};

const AppSidebar = () => {
  const { role, userName, logout } = useAuth();
  const navigate = useNavigate();

  // Yahan humne check kiya ke login user kaun hai
  // Agar login nahi hai toh redirect ya empty dikhao
  if (!role) return null;

  const items = navItems[role] || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="text-sidebar-foreground font-bold text-lg tracking-tight">
          SCHOOL ERP
        </div>
        <div className="text-[10px] text-primary font-bold uppercase mt-1">
          {role} Portal
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4 border-b border-sidebar-border bg-sidebar-accent/10">
        <div className="text-sm font-semibold text-sidebar-foreground">{userName || "User"}</div>
        <div className="text-[11px] text-muted-foreground capitalize">{role} Account</div>
      </div>

      {/* Dynamic Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item: any) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground font-bold shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 w-full rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;