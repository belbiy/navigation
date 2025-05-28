import React from 'react';
import { Flex, View } from '@adobe/react-spectrum';
import Navigation from '../components/Navigation';
import ShellHeader from '../components/ShellHeader';
import aemData from '../data/navigation-aem.json';
import { useNavigationContext } from '../context/NavigationContext';
import RecentsWidget from '../components/RecentsWidget';
import HomeBanner from '../components/HomeBanner';
const AEMApp: React.FC = () => {

  const { isNavigationExpanded } = useNavigationContext();
  
  return (
    <Flex direction="column" height="100vh" width="100vw">
      <ShellHeader 
        currentApp="aem"
        currentAppName="Adobe Experience Manager"
      />
      <Flex direction="row" flex width="100%">
        <View
          width={isNavigationExpanded ? "size-3000" : "60px"}
          height="100%"
          padding="0"
          UNSAFE_style={{
            transition: 'width 0.2s ease-in-out',
 
          }}
        >
          <Navigation 
            isExpanded={isNavigationExpanded}
            navigationData={aemData} 
          />
        </View>
        <View 
          flex 
          marginEnd="size-200"
          backgroundColor="static-white" 
          borderRadius="large"
          UNSAFE_style={{
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <HomeBanner />
          
          <View padding="size-400">
            <RecentsWidget />
          </View>
         
        </View>
      </Flex>
    </Flex>
  );
};

export default AEMApp;