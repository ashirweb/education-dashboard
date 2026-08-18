import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Loader2, GraduationCap, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminStudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: cData } = await supabase.from("classes").select("*");
      if (cData) setClasses(cData);

      const { data: sData, error } = await supabase.from("students").select("*");
      if (error) throw error;
      setStudents(sData || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!fullName || !rollNumber || !selectedClass) {
      toast({ variant: "destructive", title: "Required Fields", description: "Name, Roll No, and Class are must." });
      return;
    }

    // VS Code ke error ke mutabiq columns match kar diye hain
    const { error } = await supabase.from("students").insert([
      { 
        full_name: fullName, 
        roll_number: rollNumber, 
        class_id: selectedClass, 
        parent_phone: parentPhone,
        user_id: crypto.randomUUID() // Temporary ID for TypeScript satisfaction
      }
    ]);

    if (!error) {
      setFullName(""); setRollNumber(""); setSelectedClass(""); setParentPhone("");
      fetchData();
      toast({ title: "Success!" });
    } else {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
        <UserPlus size={32} /> Admission Portal
      </h1>

      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-6">
          <Input placeholder="Student Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
          <select 
            className="border rounded-md p-2 text-sm"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <Input placeholder="Parent Phone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
          <Button onClick={handleAdd} className="bg-indigo-600">Register</Button>
        </CardContent>
      </Card>

      <div className="bg-white border rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">Roll No</th>
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-10 text-center"><Loader2 className="animate-spin inline" /></td></tr>
            ) : (
              students.map(s => (
                <tr key={s.id} className="border-b">
                  <td className="p-4 font-mono">{s.roll_number}</td>
                  <td className="p-4 font-bold">{s.full_name}</td>
                  <td className="p-4 text-slate-600">{s.parent_phone || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudentsPage;