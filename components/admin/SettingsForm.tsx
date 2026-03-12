import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BrandingConfig {
  companyName: string;
  logoUrl: string | null;
  iconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface SettingsFormProps {
  localConfig: BrandingConfig;
  handleLiveUpdate: (key: keyof BrandingConfig, value: string) => void;
  handleSave: (e: React.FormEvent) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  localConfig,
  handleLiveUpdate,
  handleSave,
}) => {
  return (
    <Card className="bg-zinc-50 border-zinc-100">
        <div className="mb-10">
            <h3 className="text-xl font-black tracking-tight mb-2">Identidade Visual</h3>
            <p className="text-sm text-zinc-400 font-medium">Gerencie logos, ícones e detalhes da empresa.</p>
        </div>
        
        <form onSubmit={handleSave} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Company Name */}
                <div className="col-span-2">
                <Input 
                    label="Nome da Empresa" 
                    value={localConfig.companyName}
                    onChange={e => handleLiveUpdate('companyName', e.target.value)}
                />
                </div>

                {/* Logo URL */}
                <div>
                <Input 
                    label="URL do Logo (Barra Lateral)" 
                    value={localConfig.logoUrl || ''}
                    onChange={e => handleLiveUpdate('logoUrl', e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    icon="image"
                />
                <p className="text-[10px] text-zinc-400 font-bold mt-2 ml-2">Altura recomendada: 40px. PNG Transparente.</p>
                </div>

                {/* Icon URL */}
                <div>
                <Input 
                    label="Favicon / URL do Ícone" 
                    value={localConfig.iconUrl || ''}
                    onChange={e => handleLiveUpdate('iconUrl', e.target.value)}
                    placeholder="https://exemplo.com/icon.ico"
                    icon="emoji_symbols"
                />
                    <p className="text-[10px] text-zinc-400 font-bold mt-2 ml-2">Aparece na aba do navegador. Formato quadrado.</p>
                </div>
            </div>

            <hr className="border-zinc-200"/>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                <h4 className="text-sm font-black mb-1">Paleta de Cores</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                    Defina as cores principais da sua marca. O sistema irá gerar tons automaticamente para estados de hover e fundos.
                </p>
                </div>
                <div className="md:col-span-8 space-y-6">
                {/* Primary Color */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Cor Primária</label>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <input 
                                type="color" 
                                value={localConfig.primaryColor}
                                onChange={e => handleLiveUpdate('primaryColor', e.target.value)}
                                className="size-14 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer ring-2 ring-zinc-100 hover:ring-primary transition-all"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm uppercase">{localConfig.primaryColor}</p>
                            <p className="text-xs text-zinc-400">Usado para estados ativos, botões e destaques.</p>
                        </div>
                    </div>
                </div>

                    {/* Secondary Color */}
                    <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Cor Secundária</label>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <input 
                                type="color" 
                                value={localConfig.secondaryColor}
                                onChange={e => handleLiveUpdate('secondaryColor', e.target.value)}
                                className="size-14 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer ring-2 ring-zinc-100 hover:ring-secondary transition-all"
                            />
                        </div>
                        <div>
                            <p className="font-bold text-sm uppercase">{localConfig.secondaryColor}</p>
                            <p className="text-xs text-zinc-400">Usado para ênfase de texto, gráficos e acentos escuros.</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="pt-6 flex justify-end items-center gap-4">
                <Button type="submit" icon="check_circle">Salvar Configuração</Button>
            </div>
        </form>
    </Card>
  );
};
