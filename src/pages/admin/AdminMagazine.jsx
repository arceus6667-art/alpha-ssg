import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  X,
  CheckCircle2,
  Eye,
  Download
} from 'lucide-react';
import SEO from '../../components/SEO';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { showToast } from '../../components/admin/Toast';
import { contentService } from '../../services/contentService';

export default function AdminMagazine() {
  const [magazines, setMagazines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    slug: '',
    edition: 'Volume 3 • Issue 4',
    issueNumber: 'Q4 2026',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    publicationDate: 'December 2026',
    pageCount: 44,
    readTime: '30 min read',
    pdfUrl: '#',
    status: 'published',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      await contentService.fetchMagazines();
    } catch (e) {
      // Fallback
    }
    setMagazines(contentService.getMagazines());
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
      subtitle: '',
      slug: '',
      edition: 'Volume 3 • Issue 4',
      issueNumber: 'Q4 2026',
      description: '',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      publicationDate: 'December 2026',
      pageCount: 44,
      readTime: '30 min read',
      pdfUrl: '#',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || '',
      subtitle: item.subtitle || '',
      slug: item.slug || '',
      edition: item.edition || '',
      issueNumber: item.issueNumber || '',
      description: item.description || '',
      coverImage: item.coverImage || '',
      publicationDate: item.publicationDate || '',
      pageCount: item.pageCount || 40,
      readTime: item.readTime || '30 min read',
      pdfUrl: item.pdfUrl || '#',
      status: item.status || 'published',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.edition.trim()) {
      showToast('Please provide an issue title and edition name.', 'error');
      return;
    }

    const generatedSlug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    setIsSubmitting(true);
    try {
      await contentService.saveMagazine({
        ...(editingItem ? { id: editingItem.id } : {}),
        ...form,
        slug: generatedSlug,
      });
      setIsModalOpen(false);
      showToast(editingItem ? 'Magazine edition updated in database.' : 'New magazine edition published globally.');
    } catch (err) {
      showToast(err.message || 'Failed to save magazine edition', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      try {
        await contentService.deleteMagazine(deleteConfirmId);
        setDeleteConfirmId(null);
        showToast('Magazine edition deleted from database.');
      } catch (err) {
        showToast(err.message || 'Failed to delete magazine edition', 'error');
      }
    }
  };

  const filteredMagazines = magazines.filter((m) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      !query ||
      m.title.toLowerCase().includes(query) ||
      m.edition.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <SEO
        title="Magazine Publication Management"
        description="Add, edit, publish, and delete editions of the SkillSet Go Tech Journal."
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tech Journal Editions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student engineering papers, quarterly journals, and digital edition downloads.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs shadow-emerald-600/20 cursor-pointer"
        >
          <Plus size={15} />
          <span>New Journal Edition</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search magazine editions..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-3 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Editions List Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Edition & Title</th>
                <th className="py-3.5 px-4">Quarter</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMagazines.length > 0 ? (
                filteredMagazines.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-10 h-14 rounded-md object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="inline-block text-[10px] font-bold text-purple-600 uppercase font-mono">
                            {item.edition}
                          </span>
                          <strong className="block text-sm font-bold text-slate-900 line-clamp-1">
                            {item.title}
                          </strong>
                          <span className="block text-slate-400 font-mono text-[10px]">
                            /{item.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {item.issueNumber}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {item.publicationDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status || 'Published'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/magazine/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Preview public page"
                        >
                          <Eye size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit edition"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete edition"
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
                    No magazine editions found.
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
                {editingItem ? 'Edit Magazine Edition' : 'Create New Journal Edition'}
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
                  Edition Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Autonomous Era: Engineering Beyond Prompting"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Edition Volume
                  </label>
                  <input
                    type="text"
                    required
                    value={form.edition}
                    onChange={(e) => setForm({ ...form, edition: e.target.value })}
                    placeholder="Volume 3 • Issue 4"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issue Quarter
                  </label>
                  <input
                    type="text"
                    required
                    value={form.issueNumber}
                    onChange={(e) => setForm({ ...form, issueNumber: e.target.value })}
                    placeholder="Q4 2026"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cover Artwork URL
                </label>
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Editorial Summary
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Executive summary of research papers and articles in this issue..."
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Publication Month / Date
                  </label>
                  <input
                    type="text"
                    value={form.publicationDate}
                    onChange={(e) => setForm({ ...form, publicationDate: e.target.value })}
                    placeholder="December 2026"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={form.pageCount}
                    onChange={(e) => setForm({ ...form, pageCount: Number(e.target.value) })}
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
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-xs"
                >
                  {editingItem ? 'Save Changes' : 'Publish Edition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Magazine Edition"
        message="Are you sure you want to delete this edition from the publication journal? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  );
}
