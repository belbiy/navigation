import React, { useState } from 'react';
import { Flex } from '@adobe/react-spectrum';
import MoreIcon from '@spectrum-icons/workflow/More';
import PageRule from '@spectrum-icons/workflow/PageRule';
import Edit from '@spectrum-icons/workflow/Edit';
import Switch from '@spectrum-icons/workflow/Switch';
import Filter from '@spectrum-icons/workflow/Filter';

import quickActions from '../data/quick-actions.json';

interface ActionCardProps {
  title: string;
  icon: string;
  iconColor: string;
  link: string;
}

const getIconComponent = (icon: string) => {
  switch (icon) {
    case 'Rule':
      return <PageRule size="S" />;
    case 'CursorClick':
      return <Edit size="S" />;
    case 'Switch':
      return <Switch size="S" />;
    case 'Filter':
      return <Filter size="S" />;
    default:
      return <PageRule size="S" />;
  }
};

const ActionCard: React.FC<ActionCardProps> = ({ title, icon, iconColor, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '240px',
        height: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxSizing: 'border-box',
        boxShadow: isHovered 
          ? '0px 2px 8px rgba(0, 0, 0, 0.1)' 
          : '0px 1px 4px rgba(0, 0, 0, 0.05)',
        transition: 'box-shadow 0.2s ease-in-out',
        borderRadius: '8px'
      }}
    >
      <a 
        href={link}
        style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '12px 16px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon container */}
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px',
            borderRadius: '4px'
          }}
        >
          {getIconComponent(icon)}
        </div>
        
        {/* Title */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '20.8px',
            flexGrow: 1,
            fontFamily: 'Adobe Clean',
            color: '#131313'
          }}
        >
          {title}
        </div>
      </a>
    </div>
  );
};

const QuickActionsWidget: React.FC = () => {
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  
  return (
    <Flex
      direction="row"
      gap="size-150"
      wrap
      justifyContent="center"
      UNSAFE_style={{
        width: '100%'
      }}
    >
      {quickActions.map((action) => (
        <ActionCard
          key={action.id}
          title={action.title}
          icon={action.icon}
          iconColor={action.iconColor}
          link={action.link}
        />
      ))}
      
      {/* More actions button */}
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          cursor: 'pointer',
          backgroundColor: isMoreHovered ? '#f5f5f5' : 'transparent',
          borderRadius: '4px',
          transition: 'background-color 0.2s ease-in-out'
        }}
        onMouseEnter={() => setIsMoreHovered(true)}
        onMouseLeave={() => setIsMoreHovered(false)}
      >
        <MoreIcon size="S" />
      </div>
    </Flex>
  );
};

export default QuickActionsWidget; 