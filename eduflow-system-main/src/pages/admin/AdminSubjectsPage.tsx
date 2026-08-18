import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, Trash2, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSubjectsPage = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 1. Classes mangwana
    const { data: classesData } = await supabase
      .from("classes")
      .select("*")
      .order("name");
    if (classesData) setClasses(classesData);

    // 2. Subjects mangwana (Simple tarika)
    const { data: subjectsData, error: subError } = await supabase
      .from("subjects")
      .select(`
        id,
        name,
        class_id,
        classes (
          name,
          section
        )
      `);
    
    if (subError) {
      console.error("Error fetching subjects:", subError);
    } else if (subjectsData) {
      setSubjects(subjectsData);
    }
  };

  const handleAddSubject = async () => {
    if (!subjectName || !selectedClassId) {
      toast({ variant: "destructive", title: "Missing Info", description: "Fill all fields." });
      return;
    }

    const { error } = await supabase.from("subjects").insert([
      { name: subjectName, class_id: selectedClassId }
    ]);

    if (!error) {
      setSubjectName("");
      setSelectedClassId("");
      fetchData();
      toast({ title: "Success", description: "Subject added!" });
    } else {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this subject?")) {
      const { error } = await supabase.from("subjects").delete().eq("id", id);
      if (!error) {
        fetchData();
        toast({ title: "Deleted" });
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600 p-2 rounded-lg text-white">
          <BookOpen size={30} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Subject Management</h1>
      </div>

      <Card className="border-t-4 border-t-emerald-500 shadow-md">
        <CardHeader><CardTitle className="text-lg">Add New Subject</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            placeholder="Subject Name (e.g. Science)" 
            value={subjectName} 
            onChange={(e) => setSubjectName(e.target.value)} 
          />
          
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.section})
              </option>
            ))}
          </select>

          <Button onClick={handleAddSubject} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" /> Save
          </Button>
        </CardContent>
      </Card>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Subject</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Class</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium">{sub.name}</td>
                <td className="p-4">
                   {sub.classes?.name} - {sub.classes?.section}
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(sub.id)}>
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubjectsPage;