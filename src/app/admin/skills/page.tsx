"use client";

import { useState, useEffect } from "react";
import { SkillCategoryData, SkillData } from "@/types";
import { DEFAULT_SKILL_CATEGORIES } from "@/lib/constants";
import {
  Code2,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Layers,
  Star,
  Loader2,
  FolderPlus,
} from "lucide-react";

export default function SkillsAdminPage() {
  const [categories, setCategories] = useState<SkillCategoryData[]>(DEFAULT_SKILL_CATEGORIES);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillData> | null>(null);
  const [editingCategory, setEditingCategory] = useState<Partial<SkillCategoryData> | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      if (res.ok) {
        const data = await res.json();
        setCategories(data || DEFAULT_SKILL_CATEGORIES);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name || !editingSkill?.categoryId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "skill",
          data: {
            ...editingSkill,
            name: editingSkill.name,
            categoryId: editingSkill.categoryId,
            proficiency: Number(editingSkill.proficiency) || 90,
          },
        }),
      });

      if (res.ok) {
        setEditingSkill(null);
        await fetchSkills();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills?type=skill&id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) return;
    setSaving(true);
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "category",
          data: editingCategory,
        }),
      });

      if (res.ok) {
        setEditingCategory(null);
        await fetchSkills();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this category and all its skills?")) return;
    try {
      const res = await fetch(`/api/skills?type=category&id=${id}`, { method: "DELETE" });
      if (res.ok) await fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Code2 className="w-3.5 h-3.5" /> Technical Skills CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Skills & Competency Matrix
          </h1>
          <p className="text-xs text-slate-400">
            Categorize frameworks, state management libraries, cryptography algorithms, and proficiency levels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditingCategory({ id: "new", name: "", order: categories.length + 1 })}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs transition-all"
          >
            <FolderPlus className="w-4 h-4 text-cyan-400" />
            New Category
          </button>
          <button
            onClick={() =>
              setEditingSkill({
                id: "new",
                name: "",
                proficiency: 90,
                yearsOfExp: 3,
                categoryId: categories[0]?.id || "cat-1",
                featured: true,
              })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-bold text-xs hover:brightness-110 shadow-lg shadow-primary/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>

      {/* Category Groups */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-6 rounded-3xl bg-[#0d1424] border border-white/10 space-y-4 shadow-xl hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-primary" />
                <h3 className="text-base font-bold text-white">{category.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-bold text-slate-400">
                  {category.skills?.length || 0} skills
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setEditingSkill({
                      id: "new",
                      name: "",
                      proficiency: 90,
                      yearsOfExp: 2,
                      categoryId: category.id,
                      featured: false,
                    })
                  }
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to {category.name}
                </button>
                <button
                  onClick={() => setEditingCategory(category)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  title="Rename Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.skills?.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3 group hover:border-primary/40 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{skill.name}</span>
                      {skill.featured && (
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-primary font-bold">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SKILL MODAL */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-[32px] bg-[#0d1424] border border-white/15 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingSkill.id === "new" ? "Add Skill" : `Edit "${editingSkill.name}"`}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="React Native / Quick-SQLite"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Category *</label>
                <select
                  value={editingSkill.categoryId || categories[0]?.id}
                  onChange={(e) => setEditingSkill({ ...editingSkill, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">Proficiency Level</label>
                  <span className="text-xs font-bold text-primary">{editingSkill.proficiency || 90}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={editingSkill.proficiency || 90}
                  onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredSkill"
                  checked={editingSkill.featured || false}
                  onChange={(e) => setEditingSkill({ ...editingSkill, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary bg-white/5 cursor-pointer"
                />
                <label htmlFor="featuredSkill" className="text-xs font-bold text-slate-200 cursor-pointer">
                  Featured Core Competency
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-background font-bold text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="w-full max-w-sm p-6 rounded-[32px] bg-[#0d1424] border border-white/15 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingCategory.id === "new" ? "New Skill Category" : "Rename Category"}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ""}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary/60"
                  placeholder="e.g. Mobile Architecture & Cryptography"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-background font-bold text-xs"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
