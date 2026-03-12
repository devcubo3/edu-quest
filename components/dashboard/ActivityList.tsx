import React from 'react';
import { Link } from 'react-router-dom';

interface ActivityItem {
  icon: string;
  title: string;
  date: string;
  amount: string;
  type: 'good' | 'bad';
  color: string;
}

interface ActivityListProps {
  title: string;
  items: ActivityItem[];
  viewAllLink?: string;
}

export const ActivityList: React.FC<ActivityListProps> = ({ title, items, viewAllLink }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black uppercase tracking-widest">{title}</h3>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-[10px] font-bold text-zinc-400 hover:text-black transition-colors hover:underline uppercase tracking-wide">
              VER TODOS
            </Link>
          )}
      </div>
      <div className="flex flex-col gap-3">
          {items.map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-zinc-100 rounded-[20px] flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
                <div className="flex items-center gap-4 z-10">
                  <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${item.color}`}>
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div>
                      <p className="text-sm font-bold text-zinc-800">{item.title}</p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter mt-0.5">{item.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-black z-10 ${item.type === 'bad' ? 'text-zinc-400' : 'text-green-600'}`}>{item.amount}</span>
                
                {/* Hover decoration */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
      </div>
    </div>
  );
};
