import React from 'react';
import { Card } from '../ui/Card';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CoinFlowChartProps {
  data: any[];
  primaryColor: string;
  secondaryColor: string;
}

export const CoinFlowChart: React.FC<CoinFlowChartProps> = ({ data, primaryColor, secondaryColor }) => {
  return (
    <Card className="h-full bg-zinc-50 flex flex-col">
        <div className="mb-8">
        <h3 className="text-xl font-black tracking-tight mb-1">Fluxo de Moedas</h3>
        <p className="text-xs text-zinc-400 font-medium">Distribuição nos últimos 6 meses</p>
        </div>
        
        <div className="flex-1 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#a1a1aa' }} 
                    dy={10}
                />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                    {data.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={index === data.length - 1 ? primaryColor : secondaryColor} 
                        fillOpacity={index === data.length - 1 ? 1 : 0.2}
                    />
                    ))}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200">
        <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-zinc-500">Volume Total Nov</span>
            <span className="text-sm font-black" style={{ color: secondaryColor }}>245k EDU</span>
        </div>
        </div>
    </Card>
  );
};
