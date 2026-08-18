import { Users, GraduationCap, BookOpen, ClipboardList, BarChart3, Bell } from "lucide-react";

const stats = [
  { label: "Total Students", value: "1,247", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Total Teachers", value: "68", icon: <Users className="w-5 h-5" /> },
  { label: "Active Classes", value: "36", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Today's Attendance", value: "94.2%", icon: <ClipboardList className="w-5 h-5" /> },
];

const notices = [
  { title: "Annual examination schedule released", date: "10 Mar 2026", priority: "high" },
  { title: "Parent-teacher meeting on 15 March", date: "8 Mar 2026", priority: "normal" },
  { title: "Fee submission deadline: 20 March", date: "5 Mar 2026", priority: "normal" },
];

const actionItems = [
  { text: "12 pending fee approvals", action: "Review" },
  { text: "3 new teacher applications", action: "Review" },
  { text: "Class 10 result compilation pending", action: "View" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="page-title">Dashboard</h1>

      {/* Key Statistics */}
      <section className="space-y-3">
        <h2 className="section-title">Key Statistics</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                {stat.icon}
              </div>
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Notices */}
      <section className="space-y-3">
        <h2 className="section-title">Recent Notices</h2>
        <div className="space-y-2">
          {notices.map((notice, i) => (
            <div key={i} className="feed-item flex items-center justify-between">
              <div>
                <div className="feed-item-title">{notice.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{notice.date}</div>
              </div>
              {notice.priority === "high" && (
                <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5">
                  Urgent
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Action Items */}
      <section className="space-y-3">
        <h2 className="section-title">Action Required</h2>
        <div className="space-y-2">
          {actionItems.map((item, i) => (
            <div key={i} className="feed-item flex items-center justify-between">
              <span className="text-sm">{item.text}</span>
              <button className="text-xs font-medium text-primary hover:underline">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Result Overview */}
      <section className="space-y-3">
        <h2 className="section-title">Result Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="stat-card-value text-success">78%</div>
            <div className="stat-card-label">Pass Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value">72.4</div>
            <div className="stat-card-label">Average Marks</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-value text-primary">15</div>
            <div className="stat-card-label">Top Scorers</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
