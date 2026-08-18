import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, X, Check, Plus, School, Layers, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminClassesPage = () => {
  const [classes, setClasses] = useState<any[]>([]);
  // Form States
  const [className, setClassName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [section, setSection] = useState("");
  
  // Edit States
  const [editingClass, setEditingClass] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editGrade, setEditGrade] = useState("");
  const [editSection, setEditSection] = useState("");

  const { toast } = useToast();

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setClasses(data);
  };

  useEffect(() => { fetchClasses(); }, []);

  const handleAddClass = async () => {
    if (!className || !gradeLevel || !section) {
      toast({ variant: "destructive", title: "Fill all fields", description: "Please enter Name, Grade and Section." });
      return;
    }

    const { error } = await supabase.from("classes").insert([
      { 
        name: className, 
        grade_level: parseInt(gradeLevel), 
        section: section 
      }
    ]);

    if (!error) {
      setClassName(""); setGradeLevel(""); setSection("");
      fetchClasses();
      toast({ title: "Success", description: "Class created successfully!" });
    } else {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleUpdateClass = async () => {
    const { error } = await supabase
      .from("classes")
      .update({ 
        name: editName, 
        grade_level: parseInt(editGrade), 
        section: editSection 
      })
      .eq("id", editingClass.id);

    if (!error) {
      setEditingClass(null);
      fetchClasses();
      toast({ title: "Updated", description: "Class details saved." });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      const { error } = await supabase.from("classes").delete().eq("id", id);
      if (!error) fetchClasses();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <School className="text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-slate-800">Class Management</h1>
      </div>

      {/* Add New Class Form */}
      <Card className="border-none shadow-lg bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Plus size={18} className="text-blue-500" /> Add New Class
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Class Name</label>
              <Input placeholder="e.g. Science" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Grade Level</label>
              <Input type="number" placeholder="e.g. 10" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Section</label>
              <Input placeholder="e.g. A" value={section} onChange={(e) => setSection(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddClass} className="w-full bg-blue-600 hover:bg-blue-700 h-10 shadow-md">
                Create Class
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classes Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Class Name</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Grade</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Section</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-blue-50/30 transition-colors">
                {editingClass?.id === cls.id ? (
                  <>
                    <td className="p-3"><Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-9" /></td>
                    <td className="p-3"><Input type="number" value={editGrade} onChange={(e) => setEditGrade(e.target.value)} className="h-9 text-center" /></td>
                    <td className="p-3"><Input value={editSection} onChange={(e) => setEditSection(e.target.value)} className="h-9 text-center" /></td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" onClick={handleUpdateClass} className="bg-green-600 h-8 w-8"><Check size={14} /></Button>
                        <Button size="icon" variant="outline" onClick={() => setEditingClass(null)} className="h-8 w-8"><X size={14} /></Button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 font-semibold text-slate-700">{cls.name}</td>
                    <td className="p-4 text-center"><span className="bg-slate-100 px-3 py-1 rounded-md font-medium text-slate-600">{cls.grade_level}</span></td>
                    <td className="p-4 text-center"><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-bold uppercase">{cls.section}</span></td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-50" onClick={() => {
                          setEditingClass(cls); setEditName(cls.name); setEditGrade(cls.grade_level); setEditSection(cls.section);
                        }}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:bg-red-50" onClick={() => handleDelete(cls.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClassesPage;