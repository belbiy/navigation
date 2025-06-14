import React from 'react';
import { Flex, View } from '@adobe/react-spectrum';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ShellHeader from '../components/ShellHeader';
import commerceData from '../data/navigation-commerce.json';
import { useNavigationContext } from '../context/NavigationContext';
import CommerceHome from '../pages/CommerceHome';

const CommerceApp: React.FC = () => {
  const { isNavigationExpanded } = useNavigationContext();
  
  return (
    <Flex direction="column" height="100vh" width="100vw">
      <ShellHeader 
        currentApp="commerce" 
        currentAppName="Adobe Commerce"
      />
      <Flex direction="row" flex width="100%"  UNSAFE_style={{
            overflow: 'hidden'
          }}>
        <View
          width={isNavigationExpanded ? "size-3000" : "60px"}
          height="100%"
          padding="0"
          UNSAFE_style={{
            transition: 'width 0.2s ease-in-out'
          }}
        >
          <Navigation 
            isExpanded={isNavigationExpanded}
            navigationData={commerceData} 
          />
        </View>
        <View 
          flex 
          
          backgroundColor="static-white" 
          borderRadius="large"
          UNSAFE_style={{
            transition: 'all 0.2s ease-in-out',
            overflowY: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<CommerceHome />} />
            {/* Add additional commerce routes here */}
          </Routes>
        </View>
      </Flex>
    </Flex>
  );
};

export default CommerceApp;