import React from 'react';

export const LoginHero: React.FC = () => {
  return (
    <div className="relative hidden w-full items-center justify-center lg:flex lg:w-[60%] overflow-hidden bg-zinc-50 border-r border-zinc-200">
        <div className="absolute inset-0 z-0">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute bottom-12 left-1/4 h-80 w-80 rounded-full bg-zinc-100/60 blur-3xl"></div>
        </div>
        
        {/* Featured Card */}
        <div className="z-10 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
            <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-[40px] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <span className="material-symbols-outlined text-xl">military_tech</span>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest opacity-60">Aluno Destaque</p>
                </div>
                <div className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold">Top 1%</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                <img className="relative h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu_A637jj6AWz7-MSsBenCfNxPBsDvU2wAFvIAZKgFHpwDzM99WIm62Xz74R3brDkgZu8qIeDuDOwSznV1gpb0Qo59ExUCXVP-UbQQQ3lmvhKGa8ZZtDdLO_FNf_7J_Dq6mrCYMk2aHzz5dgyMZ36Q9TWgVIj4Ew0Ikzs25hxe7UHEqO6O3aU-pAgvrhBxWDB1bXk0EQ4CKmqPg8MIiuCpHDadiYdSLML7PJFCEywxGfVXIj5EKtUrq6RGPUHww-Y-fHjjAqAeTI4" alt="Student" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Sarah Jenkins</h3>
                <p className="text-zinc-500 text-sm mb-6">Trilha Avançada de Machine Learning</p>
                
                <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-zinc-500">Progresso</span>
                    <span className="text-xs font-bold text-primary">92%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
                    <div className="h-full bg-primary" style={{ width: '92%' }}></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};
