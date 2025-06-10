import React from 'react';
import { Flex, View, Heading } from '@adobe/react-spectrum';
import ExperienceLeagueWidget from '../components/ExperienceLeagueWidget';
import RecentsWidget from '../components/RecentsWidget';
import QuickActionsWidget from '../components/QuickActionsWidget';
import HomeBanner from '../components/HomeBanner';
import WelcomeMessage from '../components/WelcomeMessage';
import QuickActions from '../components/QuickActions';


const CommerceHome: React.FC = () => {
  return (
    <View>      
      <Flex direction="column">
        
      <View
                padding="size-400"
                UNSAFE_style={{
                    background: 'linear-gradient(135deg, #f6f3ea 0%, #e7c9f0 50%, #f4b9b3 100%)',
                    marginBottom: '16px',
                    paddingTop: '48px',
                    borderRadius: '16px 16px 0 0'
                }}
            >
                <Flex direction="column" gap="size-400">
                    <WelcomeMessage username="Emily" />
                    <QuickActionsWidget />
                </Flex>
            </View>
           

        <View padding="size-400">
        <Flex direction="column" gap="size-400">
          <ExperienceLeagueWidget />
          <RecentsWidget />
        </Flex>
        </View>
      </Flex>
    </View>
  );
};

export default CommerceHome; 