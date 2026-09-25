import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Clock,
  Calendar,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  Edit2,
  Trash2,
  FileCheck2,
  Sparkles,
  Award,
  FileText
} from 'lucide-react';
import SEO from '../../components/SEO';
import { contentService } from '../../services/contentService';
import { useToast } from '../../components/admin/Toast';

export default function AdminVerification() {
  const { showToast } = useToast();
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({ total: 0, valid: 0, revoked: 0, pending: 0 });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [revokeConfirmId, setRevokeConfirmId] = useState(null);

  const [form, setForm] = useState({
    verificationId: '',
    documentType: 'Certificate',
    holderName: '',
    domain: 'Full-Stack Web Development',
    issueDate: new Date().toISOString().substring(0, 10),
    expiryDate: '',
    status: 'VALID',
    certificateUrl: '',
    documentReference: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedStats, fetchedRecords] = await Promise.all([
        contentService.getVerificationStats(),
        contentService.fetchVerificationRecords(searchQuery, statusFilter === 'ALL' ? '' : statusFilter),
      ]);
      setStats(fetchedStats);
      setRecords(fetchedRecords);
    } catch (err) {
      showToast(err.message || 'Error loading verification records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('ssg:content_changed', loadData);
    return () => window.removeEventListener('ssg:content_changed', loadData);
  }, [searchQuery, statusFilter]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setForm({
      verificationId: `SSG-CERT-2026-${randomSuffix}`,
      documentType: 'Certificate',
      holderName: '',
      domain: 'Full-Stack Web Development',
      issueDate: new Date().toISOString().substring(0, 10),
      expiryDate: '',
      status: 'VALID',
      certificateUrl: '',
      documentReference: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      verificationId: item.verification_id || '',
      documentType: item.document_type || 'Certificate',
      holderName: item.holder_name || '',
      domain: item.domain || '',
      issueDate: item.issue_date || '',
      expiryDate: item.expiry_date || '',
      status: item.status || 'VALID',
      certificateUrl: item.certificate_url || '',
      documentReference: item.document_reference || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.verificationId.trim() || !form.holderName.trim()) {
      showToast('Verification ID and Holder Name are required.', 'error');
      return;
    }

    try {
      await contentService.saveVerificationRecord({
        ...(editingItem ? { id: editingItem.id } : {}),
        verificationId: form.verificationId.trim(),
        documentType: form.documentType,
        holderName: form.holderName.trim(),
        domain: form.domain.trim(),
        issueDate: form.issueDate,
        expiryDate: form.expiryDate || null,
        status: form.status,
        certificateUrl: form.certificateUrl.trim() || null,
        documentReference: form.documentReference.trim() || null,
      });

      setIsModalOpen(false);
      showToast(editingItem ? 'Verification record updated.' : 'Verification record created in central database.');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save record', 'error');
    }
  };

  const handleRevoke = async () => {
    if (!revokeConfirmId) return;
    try {
      await contentService.revokeVerificationRecord(revokeConfirmId);
      setRevokeConfirmId(null);
      showToast('Credential revoked successfully.');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to revoke credential', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <SEO
        title="Verification Portal Registry | Admin"
        description="Administrative management of issued certificates, offer letters, and credentials."
      />

      {/* Top Banner: Module Under Development */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock size={22} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                  Under Development
                </span>
                <span className="text-xs font-mono text-amber-700">Internal Admin Preview</span>
              </div>
              <h2 className="mt-1 text-base font-bold text-amber-950 sm:text-lg">
                Official Credential Verification Engine
              </h2>
              <p className="text-xs text-amber-800 max-w-2xl mt-0.5">
                The centralized database tables and administrative registry are live. The public student lookup page is scheduled for release on <strong>28 October 2026</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            <div className="rounded-xl border border-amber-300 bg-white/80 px-3 py-2 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700">Dev Deadline</span>
              <span className="font-extrabold text-slate-900">20 Oct 2026</span>
            </div>
            <div className="rounded-xl border border-amber-300 bg-white/80 px-3 py-2 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700">Public Release</span>
              <span className="font-extrabold text-emerald-950">28 Oct 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Records</span>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{stats.total || 0}</p>
          <span className="text-[11px] text-slate-400">All registered credentials</span>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Valid</span>
          <p className="mt-2 text-2xl font-extrabold text-emerald-900">{stats.valid || 0}</p>
          <span className="text-[11px] text-emerald-600">Active authentic documents</span>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700">Revoked</span>
          <p className="mt-2 text-2xl font-extrabold text-red-900">{stats.revoked || 0}</p>
          <span className="text-[11px] text-red-600">Explicitly invalidated</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Review</span>
          <p className="mt-2 text-2xl font-extrabold text-slate-700">{stats.pending || 0}</p>
          <span className="text-[11px] text-slate-400">Awaiting final signoff</span>
        </div>
      </div>

      {/* Controls & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or Holder Name..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 text-xs">
            {['ALL', 'VALID', 'REVOKED', 'PENDING'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`rounded-lg px-2.5 py-1 font-bold transition-all cursor-pointer ${
                  statusFilter === s
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition-all cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Issue New Credential</span>
        </button>
      </div>

      {/* Verification Records Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-4">Verification ID</th>
                <th className="py-3.5 px-4">Holder Name</th>
                <th className="py-3.5 px-4">Document Type</th>
                <th className="py-3.5 px-4">Domain</th>
                <th className="py-3.5 px-4">Issue Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <ShieldCheck size={36} className="mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">No verification records found</p>
                    <p className="text-[11px] mt-0.5">Click "Issue New Credential" to seed the database.</p>
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {r.verification_id}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {r.holder_name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {r.document_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {r.domain || 'General'}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {r.issue_date || '—'}
                    </td>
                    <td className="py-3 px-4">
                      {r.status === 'VALID' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px] border border-emerald-200">
                          <CheckCircle2 size={12} /> Valid
                        </span>
                      )}
                      {r.status === 'REVOKED' && (
                        <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold text-[11px] border border-red-200">
                          <XCircle size={12} /> Revoked
                        </span>
                      )}
                      {r.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold text-[11px] border border-amber-200">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(r)}
                          className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit2 size={14} />
                        </button>
                        {r.status !== 'REVOKED' && (
                          <button
                            type="button"
                            onClick={() => setRevokeConfirmId(r.id)}
                            className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Revoke Credential"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">
              {editingItem ? 'Edit Verification Record' : 'Issue New Verification Record'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              This credential will be stored directly in the centralized SQLite database.
            </p>

            <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verification ID</label>
                  <input
                    type="text"
                    required
                    value={form.verificationId}
                    onChange={(e) => setForm({ ...form, verificationId: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Document Type</label>
                  <select
                    value={form.documentType}
                    onChange={(e) => setForm({ ...form, documentType: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-bold"
                  >
                    <option value="Certificate">Certificate of Completion</option>
                    <option value="Offer Letter">Internship Offer Letter</option>
                    <option value="Recommendation">Letter of Recommendation</option>
                    <option value="Dossier">Project Completion Dossier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Recipient / Holder Name</label>
                <input
                  type="text"
                  required
                  value={form.holderName}
                  onChange={(e) => setForm({ ...form, holderName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Domain / Track</label>
                  <input
                    type="text"
                    value={form.domain}
                    onChange={(e) => setForm({ ...form, domain: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-bold"
                  >
                    <option value="VALID">VALID</option>
                    <option value="REVOKED">REVOKED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date (optional)</label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-500 cursor-pointer"
                >
                  Save Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revoke Confirmation Modal */}
      {revokeConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle size={20} />
            </div>
            <h4 className="text-base font-bold text-slate-900">Revoke Credential?</h4>
            <p className="mt-1 text-xs text-slate-500">
              Are you sure you want to revoke this credential? Once revoked, the status in the central database will permanently show REVOKED.
            </p>
            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setRevokeConfirmId(null)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRevoke}
                className="rounded-lg bg-red-600 px-3 py-1.5 font-bold text-white hover:bg-red-500 cursor-pointer"
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
