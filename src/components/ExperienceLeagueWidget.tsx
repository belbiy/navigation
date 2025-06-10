import React, { useState } from 'react';
import { View, Grid, Flex, ButtonGroup, Button, ActionButton } from '@adobe/react-spectrum';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import GridViewIcon from '@spectrum-icons/workflow/ViewGrid';
import ListViewIcon from '@spectrum-icons/workflow/ViewList';
import HelpIcon from '@spectrum-icons/workflow/Help';
import VideoIcon from '@spectrum-icons/workflow/VideoOutline';
import FileTemplate from '@spectrum-icons/workflow/FileTemplate';
import ShoppingCart from '@spectrum-icons/workflow/ShoppingCart';
import FileCode from '@spectrum-icons/workflow/FileCode';

import Widget from './Widget';
import resources from '../data/experience-league-resources.json';

// Default number of items to display
const DEFAULT_ITEMS_COUNT = 3;

interface ResourceCardProps {
  id: string;
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

// Get an icon based on the resource title and type
const getResourceIcon = (title: string, type: string) => {
  const isVideo = type.toLowerCase().includes('video');
  
  if (isVideo) {
    return <VideoIcon size="XL" />;
  }
  
  // Different icons based on title keywords
  if (title.toLowerCase().includes('product')) {
    return <ShoppingCart size="XL" />;
  } else if (title.toLowerCase().includes('code') || title.toLowerCase().includes('integrate')) {
    return <FileCode size="XL" />;
  } else {
    return <FileTemplate size="XL" />;
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({ type, title, description, imageUrl, link }) => {
  const isVideo = type.toLowerCase().includes('video');
  const icon = getResourceIcon(title, type);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <View 
      backgroundColor="gray-50"
      width="100%"
      height="100%"
      UNSAFE_style={{
        width: '100%',
        margin: '0',
        height: '100%',
        borderRadius: '4px'
      }}
    >
      <a 
        href={link} 
        target="_blank"
        rel="noopener noreferrer"
        style={{ 
          color: '#131313',
          textDecoration: 'none',
          display: 'block',
          height: '100%'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Flex direction="column" height="100%">
          {/* Image container */}
          <View 
            borderRadius="medium"
            UNSAFE_style={{
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              paddingBottom: '66.67%', // 3:2 aspect ratio (1.5:1 ratio = 2/3 = 66.67%)
              transition: 'transform 0.2s ease-in-out, box-shadow 0.1s ease-in-out',
              transform: isHovered ? 'scale(1.01)' : 'scale(1)',
              boxShadow: isHovered ? '0px 4px 16px rgba(0, 0, 0, 0.15)' : 'none'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#eff6fb',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            </div>
          </View>

          {/* Content */}
          <Flex direction="column" gap="size-100" UNSAFE_style={{ padding: '16px' }}>
            {/* Resource type */}
            <View UNSAFE_style={{ fontSize: '11px', fontWeight: 500 }}>
              {type}
            </View>
            
            {/* Title */}
            <View UNSAFE_style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              lineHeight: '20.8px',
              color: '#131313'
            }}>
              {title}
            </View>
            
            {/* Description */}
            <View UNSAFE_style={{ 
              fontSize: '14px', 
              lineHeight: '21px',
              fontWeight: 'normal',
              color: '#131313'
            }}>
              {description}
            </View>
          </Flex>
        </Flex>
      </a>
    </View>
  );
};

const ExperienceLeagueWidget: React.FC = () => {
  const [displayedItems, setDisplayedItems] = useState(DEFAULT_ITEMS_COUNT);
  
  const handleViewAll = () => {
    // Toggle between showing all items and the default number
    setDisplayedItems(displayedItems === resources.length ? DEFAULT_ITEMS_COUNT : resources.length);
  };

  return (
    <Widget title="Experience League resources for you">
      <Flex direction="column" gap="size-300">
        
        {/* Resources grid */}
        <Flex
          direction="row"
          gap="size-300"
          marginBottom="size-200"
          wrap
          UNSAFE_style={{
            width: '100%'
          }}
        >
          {resources.slice(0, displayedItems).map(resource => (
            <View 
              key={resource.id}
              UNSAFE_style={{
                width: 'calc(100% / 3 - 16px)',
                minWidth: '250px',
                maxWidth: '380px',
                flexGrow: 1,
                marginBottom: '16px'
              }}
            >
              <ResourceCard
                id={resource.id}
                type={resource.type}
                title={resource.title}
                description={resource.description}
                imageUrl={resource.imageUrl}
                link={resource.link}
              />
            </View>
          ))}
        </Flex>
      </Flex>
    </Widget>
  );
};

// Helper function to create repeat for Grid columns
function repeat(count: number, value: string) {
  return Array(count).fill(value);
}

export default ExperienceLeagueWidget; 