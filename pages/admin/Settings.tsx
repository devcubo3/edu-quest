import React, { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { PageHeader } from '../../components/ui/PageHeader';
import { SettingsForm } from '../../components/admin/SettingsForm';
import { useTheme } from '../../context/ThemeContext';

export const Settings: React.FC = () => {
  const { branding, updateBranding } = useTheme();
  
  const [localConfig, setLocalConfig] = useState(branding);

  useEffect(() => {
    setLocalConfig(branding);
  }, [branding]);

  const handleLiveUpdate = (key: keyof typeof branding, value: string) => {
    // Updates context immediately for live preview
    updateBranding({ [key]: value });
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
         <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">
            
            <PageHeader 
              title="Configurações da Plataforma" 
              subtitle="Configuração White-label" 
            />

            <SettingsForm 
              localConfig={localConfig}
              handleLiveUpdate={handleLiveUpdate}
              handleSave={handleSave}
            />
         </div>
      </main>
    </div>
  );
};