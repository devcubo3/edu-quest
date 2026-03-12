import React from 'react';
import { Card } from '../ui/Card';

interface RankingItem {
  rank: number;
  name: string;
  class: string;
  coins: number;
  avatar: string;
  isMe?: boolean;
}

interface PodiumProps {
  data: RankingItem[];
}

export const Podium: React.FC<PodiumProps> = ({ data }) => {
  if (data.length < 3) return null;

  return (
    <div className="grid grid-cols-3 gap-4 items-end mb-8 px-4 md:px-12">
        <div className="flex flex-col items-center">
            <div className="relative mb-2">
                <div className="size-16 md:size-24 rounded-full border-4 border-zinc-200 overflow-hidden bg-zinc-100">
                      <img src={data[1].avatar} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                    <span className="bg-zinc-200 text-zinc-600 size-6 md:size-8 rounded-full flex items-center justify-center font-black text-xs md:text-sm border-2 border-white shadow-sm">2</span>
                </div>
            </div>
            <p className="font-bold text-sm text-center truncate w-full">{data[1].name}</p>
            <p className="text-xs font-black text-primary">{data[1].coins}</p>
        </div>

        <div className="flex flex-col items-center -mt-8">
            <div className="relative mb-2">
                  <span className="absolute -top-6 text-2xl">👑</span>
                <div className="size-20 md:size-32 rounded-full border-4 border-yellow-400 overflow-hidden bg-yellow-50 shadow-xl shadow-yellow-200">
                    <img src={data[0].avatar} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                    <span className="bg-yellow-400 text-yellow-900 size-8 md:size-10 rounded-full flex items-center justify-center font-black text-sm md:text-lg border-4 border-white shadow-sm">1</span>
                </div>
            </div>
            <p className="font-bold text-lg text-center truncate w-full">{data[0].name}</p>
            <p className="text-sm font-black text-primary">{data[0].coins}</p>
        </div>

        <div className="flex flex-col items-center">
            <div className="relative mb-2">
                <div className="size-16 md:size-24 rounded-full border-4 border-amber-600 overflow-hidden bg-amber-50">
                    <img src={data[3].avatar} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                    <span className="bg-amber-600 text-amber-100 size-6 md:size-8 rounded-full flex items-center justify-center font-black text-xs md:text-sm border-2 border-white shadow-sm">3</span>
                </div>
            </div>
            <p className="font-bold text-sm text-center truncate w-full">{data[3].name}</p>
            <p className="text-xs font-black text-primary">{data[3].coins}</p>
        </div>
    </div>
  );
};
