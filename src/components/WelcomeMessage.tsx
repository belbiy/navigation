import React from 'react';
import { Heading, Flex, View } from '@adobe/react-spectrum';
import Edit from '@react-spectrum/s2/icons/Edit';
import Refresh from '@react-spectrum/s2/icons/Refresh';
import { ActionButtonGroup, ActionButton, Text } from '@react-spectrum/s2';

interface WelcomeMessageProps {
  username: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ username }) => {
  return (
    <View>
      <Flex alignItems="center" gap="size-100">
        <Heading level={2} margin={0} UNSAFE_style={{ fontSize: '24px' }}>
          Welcome, {username}!
        </Heading>
        <Flex marginStart="auto" gap="size-100">
                  <ActionButtonGroup isQuiet>
                      <ActionButton><Edit /><Text slot="label">Customize</Text></ActionButton>
                      
                      <ActionButton><Refresh /><Text slot="label">Reset</Text></ActionButton>
                  </ActionButtonGroup>
        
        </Flex>
      </Flex>
    </View>
  );
};

export default WelcomeMessage; 