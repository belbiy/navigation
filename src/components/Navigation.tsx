import React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { Flex, Text, ActionButton, Divider, ActionGroup, Item } from '@adobe/react-spectrum';
import { useKeyboard, usePress } from '@react-aria/interactions';
import { useFocusable } from '@react-aria/focus';
import ChevronSvg from '../assets/icons/Chevron.svg';
import PlaceholderSvg from '../assets/icons/Placeholder.svg';
import navData from '../navigation.json';

interface IconWrapperProps {
  icon: string;
  size?: string;
  style?: React.CSSProperties;
  UNSAFE_style?: React.CSSProperties;
  'aria-hidden'?: boolean;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon, 
  size, 
  style, 
  UNSAFE_style,
  'aria-hidden': ariaHidden,
  className,
  onError,
  ...props 
}) => {
  return (
    <img
      src={icon}
      style={{...style, ...UNSAFE_style}}
      aria-hidden={ariaHidden}
      className={className}
      onError={onError}
      {...props}
    />
  );
};

// Import all SVGs in the icons directory
const svgIcons = import.meta.glob('../assets/icons/*.svg', { eager: true, import: 'default' });

// Build a map of icon names to their imported URLs
const iconMap: Record<string, string> = {};
for (const path in svgIcons) {
  // Extract the file name without extension
  const match = path.match(/\/([^/]+)\.svg$/);
  if (match) {
    iconMap[match[1].toLowerCase()] = svgIcons[path] as string;
  }
}

// Function to get icon path from the map
const getIconPath = (iconName: string): string => {
  if (!iconName) return PlaceholderSvg;
  // Convert to lowercase and kebab-case
  const formattedName = iconName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
  return iconMap[formattedName] || PlaceholderSvg;
};

function CollapsibleSection({ title, children, defaultExpanded = false, sectionKey, isExpanded }: { title: string, children: React.ReactNode, defaultExpanded?: boolean, sectionKey: string, isExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { focusableProps } = useFocusable({}, buttonRef);
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setExpanded(e => !e);
      }
    }
  });
  const { pressProps } = usePress({
    onPress: () => setExpanded(e => !e)
  });

  return (
    <div key={sectionKey} style={{ width: '100%' }}>
      <button
        ref={buttonRef}
        {...focusableProps}
        {...keyboardProps}
        {...pressProps}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: isExpanded ? 'calc(100% - 16px)' : '42px',
          height: '40px',
          background: isHovered ? '#e1e1e1' : 'none',
          border: 'none',
          padding: '4px 8px',
          margin: '0 8px',
          cursor: 'pointer',
          font: 'inherit',
          borderRadius: 8,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        className="nav-section-button"
        aria-expanded={expanded}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconWrapper
            icon={ChevronSvg}
            aria-hidden
            style={{
              transition: 'transform 0.2s',
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              color: '#6E6E6E',
              width: 10,
              height: 10,
            }}
          />
        </div>
        <div 
          ref={labelRef}
          style={{ 
            width: isExpanded ? '160px' : 0,
            overflow: 'hidden',
            transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            marginLeft: '8px',
          }}
        >
          <Text UNSAFE_style={{ 
            fontWeight: 500, 
            color: '#444', 
            fontSize: 14,
          }}>
            {title}
          </Text>
        </div>
      </button>
      <div style={{ width: '100%' }}>
        {expanded && children}
      </div>
    </div>
  );
}

function renderNavItems(items: any[], parentKey = '', selectedKey: string, onSelect: (key: string) => void, hoveredKey: string | null, setHoveredKey: (key: string | null) => void, isExpanded: boolean) {
  return items.map((item, idx) => {
    const key = `${parentKey}${item.label.replace(/\s+/g, '-')}-${idx}`;
    if (item.type === 'item') {
      const iconPath = getIconPath(item.icon);
      const selected = selectedKey === key;
      const hovered = hoveredKey === key;
      const buttonRef = useRef<HTMLButtonElement>(null);
      const { focusableProps } = useFocusable({}, buttonRef);
      const { keyboardProps } = useKeyboard({
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(key);
          }
        }
      });
      const { pressProps } = usePress({
        onPress: () => onSelect(key)
      });

      return (
        <button
          ref={buttonRef}
          key={key}
          {...focusableProps}
          {...keyboardProps}
          {...pressProps}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: isExpanded ? 'calc(100% - 16px)' : '42px',
            background: 'none',
            border: 'none',
            padding: '4px 8px',
            margin: '0 8px',
            cursor: 'pointer',
            borderRadius: 8,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
          }}
          className="nav-item-button"
          onMouseEnter={() => setHoveredKey(key)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <div style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderRadius: 8,
            background: selected
              ? '#000'
              : hovered
              ? '#e1e1e1'
              : 'none',
            transition: 'background 0.2s',
          }}>
            <IconWrapper
              icon={iconPath}
              UNSAFE_style={{ 
                maxWidth: 20, 
                maxHeight: 20, 
                filter: selected ? 'brightness(0) invert(1)' : 'none', 
                transition: 'filter 0.2s' 
              }}
              onError={(e) => {
                // If the icon fails to load, use the placeholder
                const imgElement = e.target as HTMLImageElement;
                imgElement.src = PlaceholderSvg;
              }}
            />
          </div>
          <div style={{ 
            width: isExpanded ? '160px' : 0,
            overflow: 'hidden',
            transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            whiteSpace: 'nowrap',
            textAlign: 'left',
            marginLeft: '8px',
          }}>
            <Text
              UNSAFE_style={{
                color: '#222',
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {item.label}
            </Text>
          </div>
        </button>
      );
    }
    if (item.type === 'section') {
      return (
        <CollapsibleSection
          key={key}
          sectionKey={key}
          title={item.label}
          defaultExpanded={item.defaultExpanded}
          isExpanded={isExpanded}
        >
          <Flex direction="column">
            {renderNavItems(item.items, key + '-', selectedKey, onSelect, hoveredKey, setHoveredKey, isExpanded)}
          </Flex>
        </CollapsibleSection>
      );
    }
    return null;
  });
}

interface NavigationProps {
  isExpanded: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isExpanded }) => {
  const [selectedKey, setSelectedKey] = useState('Home-0');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  return (
    <Flex
      direction="column"
      UNSAFE_style={{
        width: isExpanded ? '240px' : '58px',
        minWidth: 0,
        zIndex: 10,
        position: 'relative',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <style>
        {`
          .nav-item-button:focus-visible,
          .nav-section-button:focus-visible {
            box-shadow: 0 0 0 2px #2680eb;
            outline: none;
            position: relative;
            z-index: 1;
          }
        `}
      </style>
      <Flex direction="column">
        {renderNavItems(
          navData.filter((item: any) => item.type === 'item'),
          '',
          selectedKey,
          setSelectedKey,
          hoveredKey,
          setHoveredKey,
          isExpanded
        )}
      </Flex>
      {renderNavItems(
        navData.filter((item: any) => item.type === 'section'),
        '',
        selectedKey,
        setSelectedKey,
        hoveredKey,
        setHoveredKey,
        isExpanded
      )}
    </Flex>
  );
};

export default Navigation; 