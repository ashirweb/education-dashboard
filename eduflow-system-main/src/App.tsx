import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminStudentsPage from "./pages/admin/AdminStudentsPage";
import PlaceholderPage from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";
import AdminClassesPage from "./pages/admin/AdminClassesPage";
import AdminSubjectsPage from "./pages/admin/AdminSubjectsPage";
const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) => {
  const { isLoggedIn, isLoading, role } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading-bar" />
      </div>
    );
  }
  
  if (!isLoggedIn) return <Navigate to="/" replace />;
  if (role !== allowedRole) return <Navigate to={role ? `/${role}` : "/"} replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="teachers" element={<PlaceholderPage title="Manage Teachers" />} />
              <Route path="classes" element={<AdminClassesPage />} />
              <Route path="subjects" element={<AdminSubjectsPage />} />
              <Route path="timetable" element={<PlaceholderPage title="Manage Timetable" />} />
              <Route path="attendance" element={<PlaceholderPage title="Attendance Reports" />} />
              <Route path="results" element={<PlaceholderPage title="Result Reports" />} />
              <Route path="fees" element={<PlaceholderPage title="Manage Fees" />} />
              <Route path="notices" element={<PlaceholderPage title="Notices & Announcements" />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<TeacherDashboard />} />
              <Route path="students" element={<PlaceholderPage title="My Students" />} />
              <Route path="subjects" element={<PlaceholderPage title="My Subjects" />} />
              <Route path="timetable" element={<PlaceholderPage title="Class Timetable" />} />
              <Route path="attendance" element={<PlaceholderPage title="Mark Attendance" />} />
              <Route path="results" element={<PlaceholderPage title="Upload Results" />} />
              <Route path="assignments" element={<PlaceholderPage title="Assignments" />} />
              <Route path="notices" element={<PlaceholderPage title="Send Notices" />} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRole="student"><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<StudentDashboard />} />
              <Route path="subjects" element={<PlaceholderPage title="My Subjects" />} />
              <Route path="timetable" element={<PlaceholderPage title="My Timetable" />} />
              <Route path="results" element={<PlaceholderPage title="My Results" />} />
              <Route path="attendance" element={<PlaceholderPage title="My Attendance" />} />
              <Route path="assignments" element={<PlaceholderPage title="Assignments" />} />
              <Route path="notes" element={<PlaceholderPage title="Download Notes" />} />
              <Route path="fees" element={<PlaceholderPage title="Fee Status" />} />
              <Route path="notices" element={<PlaceholderPage title="School Notices" />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
