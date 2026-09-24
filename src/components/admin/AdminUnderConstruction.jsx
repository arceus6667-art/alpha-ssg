import React from 'react';
import { Construction, Sparkles, Clock, Lock, Layers } from 'lucide-react';

export default function AdminUnderConstruction({
  moduleName = 'Module',
  icon: Icon = Construction,
  description = 'This module is currently being developed and will be available in a future update.',
  plannedFeatures = [],
}) {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/30 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0 shadow-inner">
            <Icon size={32} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 border border-amber-200">
                <Clock size={12} />
                Under Construction
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Sprint Phase 2
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {moduleName} Management
            </h1>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Planned Feature Wireframe Preview (Disabled Blueprint Cards) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Planned Capabilities & Blueprint
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These controls are preview place-holders and will connect to backend APIs in upcoming releases.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Lock size={12} />
            Disabled
          </span>
        </div>

        {/* Mock Wireframe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 opacity-65 pointer-events-none select-none">
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-5 text-center">
            <div className="h-8 w-8 mx-auto rounded-lg bg-slate-200 mb-3" />
            <div className="h-4 w-28 mx-auto bg-slate-200 rounded mb-2" />
            <div className="h-3 w-40 mx-auto bg-slate-100 rounded" />
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-5 text-center">
            <div className="h-8 w-8 mx-auto rounded-lg bg-slate-200 mb-3" />
            <div className="h-4 w-32 mx-auto bg-slate-200 rounded mb-2" />
            <div className="h-3 w-44 mx-auto bg-slate-100 rounded" />
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-5 text-center">
            <div className="h-8 w-8 mx-auto rounded-lg bg-slate-200 mb-3" />
            <div className="h-4 w-24 mx-auto bg-slate-200 rounded mb-2" />
            <div className="h-3 w-36 mx-auto bg-slate-100 rounded" />
          </div>
        </div>

        {/* Feature List */}
        {plannedFeatures.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Upcoming Features in {moduleName}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              {plannedFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
