import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandingConfig } from '../types';

interface ThemeContextType {
  branding: BrandingConfig;
  updateBranding: (newConfig: Partial<BrandingConfig>) => void;
}

const DEFAULT_BRANDING: BrandingConfig = {
  companyName: 'EduQuest Academy',
  primaryColor: '#135bec',
  secondaryColor: '#18181b', // Zinc-900 default
  logoUrl: null,
  iconUrl: null
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<BrandingConfig>(DEFAULT_BRANDING);

  useEffect(() => {
    // Apply CSS variables
    document.documentElement.style.setProperty('--color-primary', branding.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', branding.secondaryColor);

    // Update Favicon
    if (branding.iconUrl) {
        const link = document.getElementById('app-favicon') as HTMLLinkElement;
        if (link) {
            link.href = branding.iconUrl;
        }
    }
  }, [branding]);

  const updateBranding = (newConfig: Partial<BrandingConfig>) => {
    setBranding(prev => ({ ...prev, ...newConfig }));
  };

  return (
    <ThemeContext.Provider value={{ branding, updateBranding }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};