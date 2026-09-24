import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Calendar,
  Eye,
  Archive
} from 'lucide-react';
import SEO from '../../components/SEO';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { showToast } from '../../components/admin/Toast';
import { contentService } from '../../services/contentService';

export default function AdminUpdates() {
  const [updates, setUpdates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    content: '',
    ctaText: '',
    ctaUrl: '',
    priority: 'normal',
    status: 'published',
    expiresAt: '',
  });

  const loadData = () => {
    setUpdates(contentService.getUpdates());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('ssg:content_changed', loadData);
    return () => window.removeEventListener('ssg:content_changed', loadData);
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setForm({
      title: '',
      shortDescription: '',
      content: '',
      ctaText: '',
      ctaUrl: '',
      priority: 'normal',
      status: 'published',
      expiresAt: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      shortDescription: item.shortDescription || '',
      content: item.content || '',
      ctaText: item.ctaText || '',
      ctaUrl: item.ctaUrl || '',
      priority: item.priority || 'normal',
      status: item.status || 'draft',
      expiresAt: item.expiresAt ? item.expiresAt.substring(0, 10) : '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.shortDescription.trim()) {
      showToast('Please fill in required fields (Title & Short description)', 'error');
      return;
    }

    contentService.saveUpdate({
      ...(editingItem ? { id: editingItem.id } : {}),
      ...form,
    });

    setIsModalOpen(false);
    showToast(editingItem ? 'Announcement updated successfully.' : 'New announcement created and published.');
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      contentService.deleteUpdate(deleteConfirmId);
      setDeleteConfirmId(null);
      showToast('Announcement deleted successfully.');
    }
  };

  const togglePublishStatus = (item) => {
    const nextStatus = item.status === 'published' ? 'draft' : 'published';
    contentService.saveUpdate({
      ...item,
      status: nextStatus,
    });
    showToast(`Status updated to ${nextStatus}.`);
  };

  const filteredUpdates = updates.filter((u) => {
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      u.title.toLowerCase().includes(query) ||
      u.shortDescription.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <SEO
        title="Updates & Announcements Management"
        description="Create, edit, publish, and delete student announcements and cohort updates."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Announcements & Updates
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage banner alerts, cohort notices, and platform updates shown on the public site.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={15} />
          <span>Create Announcement</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search announcements..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
          {['all', 'published', 'draft', 'archived'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-md font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Title & Details</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUpdates.length > 0 ? (
                filteredUpdates.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <strong className="block text-sm font-bold text-slate-900">
                        {item.title}
                      </strong>
                      <span className="block text-slate-500 mt-0.5 line-clamp-1">
                        {item.shortDescription}
                      </span>
                      {item.ctaText && item.ctaUrl && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-semibold mt-1">
                          <span>CTA: {item.ctaText}</span>
                          <ExternalLink size={10} />
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.priority === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : item.priority === 'important'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => togglePublishStatus(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          item.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : item.status === 'draft'
                            ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                        title="Click to toggle publish status"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        <span className="capitalize">{item.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit announcement"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete announcement"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No announcements found matching the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {editingItem ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. October 2026 Cohort Admissions Open"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Short Description (Preview Text) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Concise 1-2 sentence preview shown on homepage cards and banners..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Content / Notice
                </label>
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Full detailed announcement text..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Optional CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    placeholder="e.g. View Cohort"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    CTA Button Destination URL
                  </label>
                  <input
                    type="text"
                    value={form.ctaUrl}
                    onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
                    placeholder="e.g. /internships or https://..."
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer shadow-sm"
                >
                  {editingItem ? 'Save Changes' : 'Create & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement? It will be removed from the public website immediately."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
