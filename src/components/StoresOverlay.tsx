import React from 'react';
import MenuOverlay from './MenuOverlay';
import storesData from '../data/navigation-commerce-stores.json';

const StoresOverlay: React.FC = () => {
  const handleItemClick = (id: string, label: string) => {
    console.log(`Stores item clicked: ${label} (${id})`);
    // Here you would add navigation or other actions
  };

  return <MenuOverlay data={storesData} onItemClick={handleItemClick} />;
};

export default StoresOverlay; 