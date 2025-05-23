import React from 'react';
import MenuOverlay from './MenuOverlay';
import systemData from '../data/navigation-commerce-system.json';

const SystemOverlay: React.FC = () => {
  const handleItemClick = (id: string, label: string) => {
    console.log(`System item clicked: ${label} (${id})`);
    // Here you would add navigation or other actions
  };

  return <MenuOverlay data={systemData} onItemClick={handleItemClick} />;
};

export default SystemOverlay; 