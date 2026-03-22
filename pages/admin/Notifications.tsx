import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { MOCK_NOTIFICATIONS } from '../../constants';

export const Notifications: React.FC = () => {
  const { user } = useAuth();
  const all = MOCK_NOTIFICATIONS.filter(n => n.role === user?.role);

  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(all.filter(n => n.read).map(n => n.id))
  );
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => setReadIds(new Set(all.map(n => n.id)));
  const markRead = (id: string) => setReadIds(prev => new Set([...prev, id]));

  const displayed = filter === 'unread'
    ? all.filter(n => !readIds.has(n.id))
    : all;

  const unreadCount = all.filter(n => !readIds.has(n.id)).length;

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-2xl mx-auto w-full pb-12">

          <div className="flex items-start justify-between mb-8">
            <PageHeader
              title="Notificações"
              subtitle="Central de Avisos"
            />
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors mt-1 whitespace-nowrap"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="inline-flex rounded-full border border-zinc-200 p-1 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === 'all' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                filter === 'unread' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
              }`}
            >
              Não lidas
              {unreadCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none ${
                  filter === 'unread' ? 'bg-white text-black' : 'bg-zinc-900 text-white'
                }`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* List */}
          <Card noPadding className="border-zinc-200 overflow-hidden">
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-5xl text-zinc-300 mb-4">notifications_off</span>
                <p className="text-zinc-500 font-semibold text-sm">Nenhuma notificação não lida</p>
                <p className="text-zinc-400 text-xs mt-1">Você está em dia com tudo</p>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {displayed.map(notif => {
                  const isUnread = !readIds.has(notif.id);
                  return (
                    <li
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className={`flex gap-4 items-start px-6 py-5 cursor-pointer transition-colors hover:bg-zinc-50 ${
                        isUnread ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className={`size-11 rounded-full flex items-center justify-center flex-shrink-0 ${notif.iconBg}`}>
                        <span className="material-symbols-outlined text-[22px]">{notif.icon}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm leading-tight ${isUnread ? 'font-bold text-zinc-900' : 'font-semibold text-zinc-700'}`}>
                            {notif.title}
                          </p>
                          {isUnread && (
                            <span
                              className="size-2 rounded-full flex-shrink-0 mt-1.5"
                              style={{ backgroundColor: 'var(--color-primary)' }}
                            />
                          )}
                        </div>
                        <p className="text-sm text-zinc-500 mt-1 leading-snug">{notif.message}</p>
                        <p className="text-[11px] text-zinc-400 mt-2 font-medium">{notif.time}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>

        </div>
      </main>
    </div>
  );
};
