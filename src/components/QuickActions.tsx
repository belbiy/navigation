import React from 'react';
import { Flex, View, Text } from '@adobe/react-spectrum';
import Document from '@react-spectrum/s2/icons/File';
import FileCode from '@react-spectrum/s2/icons/FileText';
import WebPage from '@react-spectrum/s2/icons/WebPage';
import More from '@react-spectrum/s2/icons/More';
import { ActionButton } from '@react-spectrum/s2';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title }) => {
  return (
    <View
      backgroundColor="static-white"
      borderRadius="medium"
      UNSAFE_style={{
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}
      UNSAFE_className="action-card"
    >
      <style>
        {`
          .action-card:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            background-color:rgb(210, 197, 159);
            cursor: default;
          }
       
        `}
      </style>
      <Flex alignItems="center" gap="size-50" UNSAFE_style={{ padding: '0 16px 0 0', background: 'none' }}>
        <View
          padding="size-125"
          UNSAFE_style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '24px',
            width: '24px'
          }}
        >
          {icon}
        </View>
        <Text UNSAFE_style={{ fontWeight: 600 }}>{title}</Text>
      </Flex>
    </View>
  );
};

const QuickActions: React.FC = () => {
  return (
    <Flex gap="size-200" width="100%" alignSelf="center" alignContent="center" wrap alignItems="center">
      <ActionCard 
        icon={<Document />} 
        title="Create page" 
      />
      <ActionCard 
        icon={<FileCode />} 
        title="Create content fragment" 
      />
      <ActionCard 
        icon={<WebPage />} 
        title="Create site" 
      />
      <ActionButton isQuiet UNSAFE_style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <More />
      </ActionButton>
    </Flex>
  );
};

export default QuickActions; 