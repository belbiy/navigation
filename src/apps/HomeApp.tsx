import React from 'react';
import { View, Flex } from '@adobe/react-spectrum';
import HomeBanner from '../components/HomeBanner';
import RecentsWidget from '../components/RecentsWidget';

const HomeApp: React.FC = () => {
  return (
    <View padding="size-300">
      <Flex direction="column" gap="size-300">
        <HomeBanner />
        <RecentsWidget />
      </Flex>
    </View>
  );
};

export default HomeApp; 