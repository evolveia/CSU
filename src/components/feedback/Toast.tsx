import React from 'react';
import { ToastMessage } from '../../types';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0 pointer-events-none"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        let borderClass = 'border-[#C9A227]/40';
        let bgClass = 'bg-[#08243F] text-white';
        let Icon = Info;
        let iconColor = 'text-[#C9A227]';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'text-[#1E8E5A]';
          borderClass = 'border-[#1E8E5A]/40';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-[#C0392B]';
          borderClass = 'border-[#C0392B]/50';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-[#C77D0A]';
          borderClass = 'border-[#C77D0A]/50';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-3 ${bgClass} ${borderClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-[#DCE4EE]">{toast.title}</h4>
              <p className="text-xs text-[#EAEFF5]/80 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#DCE4EE]/60 hover:text-white transition-colors p-1 rounded-md"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
