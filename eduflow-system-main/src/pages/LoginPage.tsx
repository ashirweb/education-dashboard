import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, BookOpen, GraduationCap } from "lucide-react";
import { toast } from "sonner";

const roles: { value: UserRole; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: "admin",
    label: "Administrator",
    description: "School management and oversight",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    value: "teacher",
    label: "Teacher",
    description: "Class management and grading",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    value: "student",
    label: "Student",
    description: "Academics and assignments",
    icon: <GraduationCap className="w-6 h-6" />,
  },
];

const roleColors: Record<UserRole, string> = {
  admin: "border-admin bg-admin/5 text-admin",
  teacher: "border-teacher bg-teacher/5 text-teacher",
  student: "border-student bg-student/5 text-student",
};

const roleBtnColors: Record<UserRole, string> = {
  admin: "bg-admin hover:bg-admin/90 text-primary-foreground",
  teacher: "bg-teacher hover:bg-teacher/90 text-primary-foreground",
  student: "bg-student hover:bg-student/90 text-primary-foreground",
};

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup, isLoggedIn, role: currentRole } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isLoggedIn && currentRole) {
    navigate(`/${currentRole}`, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !email || !password) return;

    setLoading(true);
    let result;

    if (isSignUp) {
      if (!fullName.trim()) {
        toast.error("Full name is required");
        setLoading(false);
        return;
      }
      result = await signup(email, password, fullName, selectedRole);
    } else {
      result = await login(email, password);
    }

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      if (isSignUp) {
        toast.success("Account created. Please check your email to confirm, then sign in.");
      } else {
        navigate(`/${selectedRole}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-heading text-foreground tracking-tight">
            School Management System
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Select your role to continue
          </p>
        </div>

        {/* Role Selection */}
        <div className="space-y-3 mb-8">
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelectedRole(r.value)}
              className={`w-full flex items-center gap-4 p-4 border text-left transition-colors ${
                selectedRole === r.value
                  ? roleColors[r.value]
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              <div className={selectedRole === r.value ? "" : "text-muted-foreground"}>
                {r.icon}
              </div>
              <div>
                <div className="font-heading font-medium text-sm">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Login / Signup Form */}
        {selectedRole && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-card border border-border p-6 space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="border-border"
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border-border"
                  required
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className={`w-full font-heading font-medium ${roleBtnColors[selectedRole]}`}
              >
                {loading
                  ? "Please wait..."
                  : isSignUp
                  ? `Create ${roles.find((r) => r.value === selectedRole)?.label} Account`
                  : `Sign In as ${roles.find((r) => r.value === selectedRole)?.label}`}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-muted-foreground hover:text-foreground text-center w-full transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "No account yet? Create one"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
