import { GraduationCap, BookOpen, Calendar, ClipboardList, Upload, FileText } from "lucide-react";

const quickStats = [
  { label: "Assigned Students", value: "142", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Subjects", value: "3", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Classes Today", value: "5", icon: <Calendar className="w-5 h-5" /> },
  { label: "Pending Grades", value: "28", icon: <Upload className="w-5 h-5" /> },
];

const todaySchedule = [
  { time: "08:00 – 08:45", class: "Class 9-A", subject: "Physics" },
  { time: "09:00 – 09:45", class: "Class 10-B", subject: "Physics" },
  { time: "10:00 – 10:45", class: "Class 11-A", subject: "Mathematics" },
  { time: "11:30 – 12:15", class: "Class 9-B", subject: "Physics" },
  { time: "13:00 – 13:45", class: "Class 12-A", subject: "Mathematics" },
];

const pendingTasks = [
  { text: "Mark attendance for Class 9-A", type: "attendance" },
  { text: "Upload Class 10-B test results", type: "results" },
  { text: "Review 12 assignment submissions", type: "assignments" },
];

const TeacherDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="page-title">Dashboard</h1>

      {/* Stats */}
      <section className="space-y-3">
        <h2 className="section-title">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
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

      {/* Today's Schedule */}
      <section className="space-y-3">
        <h2 className="section-title">Today's Schedule</h2>
        <div className="bg-card border border-border">
          <div className="grid grid-cols-3 px-5 py-3 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider font-heading">
            <span>Time</span>
            <span>Class</span>
            <span>Subject</span>
          </div>
          {todaySchedule.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-5 py-3 border-b border-border last:border-b-0 text-sm"
            >
              <span className="text-muted-foreground">{item.time}</span>
              <span className="font-medium">{item.class}</span>
              <span>{item.subject}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pending Tasks */}
      <section className="space-y-3">
        <h2 className="section-title">Pending Tasks</h2>
        <div className="space-y-2">
          {pendingTasks.map((task, i) => (
            <div key={i} className="feed-item flex items-center justify-between">
              <div className="flex items-center gap-3">
                {task.type === "attendance" && <ClipboardList className="w-4 h-4 text-muted-foreground" />}
                {task.type === "results" && <Upload className="w-4 h-4 text-muted-foreground" />}
                {task.type === "assignments" && <FileText className="w-4 h-4 text-muted-foreground" />}
                <span className="text-sm">{task.text}</span>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">
                Complete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
