import React from 'react';
import { View } from '@adobe/react-spectrum';
import { useApp } from '../context/AppContext';

const AppContent: React.FC = () => {
  const { currentApp } = useApp();

  return (
    <View 
      flex 
      padding="size-200"
      UNSAFE_style={{
        background: '#fff',
        borderRadius: 16,
        margin: 'size-200',
        transition: 'margin 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <h2>{currentApp.label}</h2>
    </View>
  );
};

export default AppContent; 