import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  X,
  CheckCircle2,
  Eye,
  Users
} from 'lucide-react';
import SEO from '../../components/SEO';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { showToast } from '../../components/admin/Toast';
import { contentService } from '../../services/contentService';
import { siteConfig } from '../../config/siteConfig';

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    shortTitle: '',
    description: '',
    coverImage: '',
    date: '',
    startTime: '',
    endTime: '',
    duration: '4 Hours',
    mode: 'Live Interactive (Virtual)',
    status: 'registration-open',
    speakerName: '',
    speakerRole: '',
    speakerCompany: 'SkillSet Go EduTech',
    speakerAvatar: '',
    topicsInput: '',
    seatCapacity: '100 Seats',
    badge: 'Popular',
    registrationUrl: siteConfig.applicationFormUrl,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      await contentService.fetchWorkshops();
    } catch (e) {
      // Fallback
    }
    setWorkshops(contentService.getWorkshops());
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
      slug: '',
      shortTitle: '',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      date: 'October 30, 2026',
      startTime: '10:00 AM IST',
      endTime: '02:00 PM IST',
      duration: '4 Hours',
      mode: 'Live Interactive (Virtual)',
      status: 'registration-open',
      speakerName: '',
      speakerRole: 'Senior Systems Engineer',
      speakerCompany: 'SkillSet Go EduTech',
      speakerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      topicsInput: 'Introduction to Architecture\nCore Practical Implementation\nLive Q&A and Portfolio Review',
      seatCapacity: '100 Seats',
      badge: 'New',
      registrationUrl: siteConfig.applicationFormUrl,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      shortTitle: item.shortTitle || '',
      description: item.description || '',
      coverImage: item.coverImage || '',
      date: item.date || '',
      startTime: item.startTime || '',
      endTime: item.endTime || '',
      duration: item.duration || '4 Hours',
      mode: item.mode || 'Live Interactive (Virtual)',
      status: item.status || 'registration-open',
      speakerName: item.speaker?.name || '',
      speakerRole: item.speaker?.role || '',
      speakerCompany: item.speaker?.company || '',
      speakerAvatar: item.speaker?.avatar || '',
      topicsInput: Array.isArray(item.topics) ? item.topics.join('\n') : '',
      seatCapacity: item.seatCapacity || '100 Seats',
      badge: item.badge || '',
      registrationUrl: item.registrationUrl || siteConfig.applicationFormUrl,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date.trim()) {
      showToast('Please provide a workshop title and session date.', 'error');
      return;
    }

    const topics = form.topicsInput
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const generatedSlug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const workshopPayload = {
      ...(editingItem ? { id: editingItem.id } : {}),
      title: form.title,
      slug: generatedSlug,
      shortTitle: form.shortTitle || form.title,
      description: form.description,
      coverImage: form.coverImage,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      duration: form.duration,
      mode: form.mode,
      status: form.status,
      badge: form.badge,
      seatCapacity: form.seatCapacity,
      registrationUrl: form.registrationUrl,
      topics,
      speaker: {
        name: form.speakerName || 'Technical Mentor',
        role: form.speakerRole || 'Lead Instructor',
        company: form.speakerCompany || 'SkillSet Go EduTech',
        avatar: form.speakerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Industry practitioner with deep experience in scalable systems and student mentorship.',
      },
    };

    setIsSubmitting(true);
    try {
      await contentService.saveWorkshop(workshopPayload);
      setIsModalOpen(false);
      showToast(editingItem ? 'Workshop updated in database.' : 'New workshop published globally.');
    } catch (err) {
      showToast(err.message || 'Failed to save workshop', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      try {
        await contentService.deleteWorkshop(deleteConfirmId);
        setDeleteConfirmId(null);
        showToast('Workshop deleted from central database.');
      } catch (err) {
        showToast(err.message || 'Failed to delete workshop', 'error');
      }
    }
  };

  const setWorkshopStatus = async (item, newStatus) => {
    try {
      await contentService.saveWorkshop({
        ...item,
        status: newStatus,
      });
      showToast(`Workshop status changed to "${newStatus}".`);
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const filteredWorkshops = workshops.filter((w) => {
    const matchesStatus = statusFilter === 'all' || w.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      w.title.toLowerCase().includes(query) ||
      w.speaker?.name?.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <SEO
        title="Workshops Management"
        description="Add, edit, delete, and publish technical workshops and live masterclasses."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workshops & Masterclasses
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage live weekend sessions, speaker information, syllabus topics, and registration links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs shadow-emerald-600/20 cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Workshop</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workshops or speakers..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs overflow-x-auto">
          {['all', 'registration-open', 'upcoming', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status === 'registration-open' ? 'Reg Open' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Workshops Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Workshop</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Instructor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWorkshops.length > 0 ? (
                filteredWorkshops.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-12 h-8 rounded-md object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <strong className="block text-sm font-bold text-slate-900 line-clamp-1">
                            {item.title}
                          </strong>
                          <span className="block text-slate-400 font-mono text-[10px]">
                            /{item.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">
                        {item.date}
                      </span>
                      <span className="text-slate-400 text-[11px] block">
                        {item.startTime} • {item.mode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {item.speaker?.name || 'Assigned Mentor'}
                      </span>
                      <span className="text-slate-400 text-[11px] block">
                        {item.speaker?.role || 'Lead Instructor'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => setWorkshopStatus(item, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold py-1 px-2 text-slate-700 cursor-pointer focus:outline-none"
                      >
                        <option value="registration-open">Registration Open</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="draft">Draft</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/workshops/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Preview public page"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit workshop"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete workshop"
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
                    No workshops found matching criteria.
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
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                {editingItem ? 'Edit Workshop' : 'Create New Workshop'}
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
                  Workshop Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Building Production-Ready AI Agents with Gemini & LangChain"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Slug (URL Key)
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. building-ai-agents-langchain"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Banner Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Comprehensive description of the workshop curriculum and outcomes..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Session Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="October 30, 2026"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Timing
                  </label>
                  <input
                    type="text"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    placeholder="10:00 AM IST"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
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
                    <option value="registration-open">Registration Open</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Speaker Fields */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Instructor Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={form.speakerName}
                      onChange={(e) => setForm({ ...form, speakerName: e.target.value })}
                      placeholder="e.g. Aditya Sharma"
                      className="w-full rounded-lg border border-slate-300 bg-white py-1.5 px-2.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Role</label>
                    <input
                      type="text"
                      value={form.speakerRole}
                      onChange={(e) => setForm({ ...form, speakerRole: e.target.value })}
                      placeholder="Lead AI Systems Architect"
                      className="w-full rounded-lg border border-slate-300 bg-white py-1.5 px-2.5 text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Avatar URL</label>
                    <input
                      type="text"
                      value={form.speakerAvatar}
                      onChange={(e) => setForm({ ...form, speakerAvatar: e.target.value })}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-slate-300 bg-white py-1.5 px-2.5 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Topics Syllabus (One per line)
                </label>
                <textarea
                  rows={3}
                  value={form.topicsInput}
                  onChange={(e) => setForm({ ...form, topicsInput: e.target.value })}
                  placeholder="Topic 1&#10;Topic 2&#10;Topic 3"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
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
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-xs"
                >
                  {editingItem ? 'Save Changes' : 'Publish Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Workshop"
        message="Are you sure you want to permanently delete this workshop? It will be removed from the public website immediately."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
