import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Layers,
  BookOpen,
  FileText,
  BarChart3,
  Users,
  Briefcase,
  FolderKanban,
  FileCheck2,
  DollarSign,
  Tag,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Logo from '../components/Logo';
import ToastContainer from '../components/admin/Toast';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import { authService } from '../services/authService';

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = authService.getCurrentUser() || { name: 'Administrator', role: 'Super Admin' };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItemsActive = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Updates', path: '/admin/updates', icon: Bell },
    { label: 'Workshops', path: '/admin/workshops', icon: Layers },
    { label: 'Magazine', path: '/admin/magazine', icon: BookOpen },
    { label: 'Articles', path: '/admin/articles', icon: FileText },
    { label: 'Click Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const navItemsFuture = [
    { label: 'Users', path: '/admin/users', icon: Users, badge: 'Soon' },
    { label: 'Domains', path: '/admin/domains', icon: Briefcase, badge: 'Soon' },
    { label: 'Projects', path: '/admin/projects', icon: FolderKanban, badge: 'Soon' },
    { label: 'Offer Letters', path: '/admin/offer-letters', icon: FileCheck2, badge: 'Soon' },
    { label: 'Total Sales', path: '/admin/sales', icon: DollarSign, badge: 'Soon' },
    { label: 'Categories', path: '/admin/categories', icon: Tag, badge: 'Soon' },
  ];

  const renderNavLinks = () => (
    <div className="space-y-6">
      {/* Active Management Modules */}
      <div>
        <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
          Core Operations
        </span>
        <nav className="space-y-1">
          {navItemsActive.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Future Under Construction Modules */}
      <div>
        <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
          Future Modules
        </span>
        <nav className="space-y-1">
          {navItemsFuture.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-amber-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  {item.badge}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Settings */}
      <div className="pt-3 border-t border-slate-800/80">
        <NavLink
          to="/admin/settings"
          onClick={() => setMobileSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`
          }
        >
          <Settings size={16} />
          <span>Admin Settings</span>
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8faf9] font-sans flex text-slate-800">
      <ToastContainer />

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-[#0a0f1d] border-r border-slate-800/80 shrink-0 sticky top-0 h-screen p-4 overflow-y-auto z-30">
        <div>
          {/* Admin Brand */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800/80">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="bg-white p-1 rounded-lg inline-flex shadow-xs">
                <Logo size={34} />
              </div>
            </Link>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <ShieldCheck size={11} />
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          {renderNavLinks()}
        </div>

        {/* Footer info & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <div className="truncate">
              <span className="block font-bold text-slate-200 truncate">{currentUser.name}</span>
              <span className="block text-[11px] text-slate-400 truncate">{currentUser.role}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 text-xs text-slate-300 hover:text-white py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </aside>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0f1d] p-4 transform transition-transform duration-200 ease-in-out lg:hidden overflow-y-auto ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="bg-white p-1 rounded-lg inline-flex shadow-xs">
            <Logo size={32} />
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        {renderNavLinks()}
        <div className="mt-8 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-red-400 bg-red-950/30 border border-red-900/40 rounded-xl cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Subtle Anti-Gravity background particles on dashboard workspace */}
        <AntiGravityCanvas particleCount={25} interactive={false} theme="green" className="opacity-15" />

        {/* Top Header */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-900 text-sm">Control Console</span>
              <span>/</span>
              <span className="capitalize text-emerald-700 font-semibold">
                {location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink size={13} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 bg-white shadow-xs transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
