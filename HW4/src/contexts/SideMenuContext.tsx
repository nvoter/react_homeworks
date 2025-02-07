import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SideMenuContextType {
  isSideMenuVisible: boolean;
  toggleSideMenu: () => void;
  closeSideMenu: () => void;
  openSideMenu: () => void;
}

const SideMenuContext = createContext<SideMenuContextType | undefined>(undefined);

export const SideMenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  const toggleSideMenu = () => setSideMenuVisible((prev) => !prev);
  const closeSideMenu = () => setSideMenuVisible(false);
  const openSideMenu = () => setSideMenuVisible(true);

  return (
    <SideMenuContext.Provider value={{ isSideMenuVisible, toggleSideMenu, closeSideMenu, openSideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = (): SideMenuContextType => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};