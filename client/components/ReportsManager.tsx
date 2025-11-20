import { useState, useEffect } from "react";
import { Trash2, Plus, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Report } from "@shared/api";

export default function ReportsManager() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error("Failed to load reports");
      const data = await response.json();
      setReports(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReport = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      if (!response.ok) throw new Error("Failed to create report");

      const data = await response.json();
      setReports([...reports, data.data]);
      setNewTitle("");
      setNewContent("");
      setIsCreating(false);
      setSuccess("Report created successfully!");
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create report");
    }
  };

  const handleUpdateReport = async (reportId: string) => {
    if (!newTitle.trim() || !newContent.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      const response = await fetch(`/api/reports?reportId=${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });

      if (!response.ok) throw new Error("Failed to update report");

      const data = await response.json();
      setReports(reports.map((r) => (r.id === reportId ? data.data : r)));
      setEditingId(null);
      setNewTitle("");
      setNewContent("");
      setSuccess("Report updated successfully!");
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update report");
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      const response = await fetch(`/api/reports?reportId=${reportId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete report");

      setReports(reports.filter((r) => r.id !== reportId));
      setSuccess("Report deleted successfully!");
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete report");
    }
  };

  const startEdit = (report: Report) => {
    setEditingId(report.id);
    setNewTitle(report.title);
    setNewContent(report.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewTitle("");
    setNewContent("");
  };

  if (isLoading) {
    return (
      <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
        <div className="text-center text-muted-foreground">
          Loading reports...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Shared Reports</h2>
          <Button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            New Report
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-sm">
            {success}
          </div>
        )}

        {isCreating && (
          <div className="mb-6 p-6 bg-slate-900 rounded-lg border border-slate-600">
            <h3 className="text-lg font-semibold mb-4">Create New Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Report title"
                  className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Report content"
                  rows={6}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateReport} className="flex-1">
                  Create Report
                </Button>
                <Button
                  onClick={() => {
                    setIsCreating(false);
                    setNewTitle("");
                    setNewContent("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {reports.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">No reports yet.</p>
            <Button onClick={() => setIsCreating(true)}>
              Create the first report
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-6 bg-slate-900 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
              >
                {editingId === report.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xl font-semibold bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={6}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleUpdateReport(report.id)}
                        className="flex-1"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={cancelEdit}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {report.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          Updated{" "}
                          {new Date(report.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(report)}
                          className="p-2 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white"
                          title="Edit report"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-2 hover:bg-red-900/30 rounded transition-colors text-red-400 hover:text-red-300"
                          title="Delete report"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {report.content}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
