import React from 'react';
import { Flex, View } from '@adobe/react-spectrum';
import WelcomeMessage from './WelcomeMessage';
import PromptBar from './PromptBar';
import QuickActions from './QuickActions';

const HomeBanner: React.FC = () => {
    return (
        <>
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
                    <PromptBar />
                </Flex>
            </View>
            <View
                padding="size-400"
            ><QuickActions /></View>
        </>
    );
};

export default HomeBanner;
