import React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { Flex, Text } from '@adobe/react-spectrum';
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

// Function to dynamically import SVG icons
const getIconPath = (iconName: string): string => {
  try {
    // Convert icon name to lowercase for case-insensitive matching
    const lowercaseName = iconName.toLowerCase();
    
    // Convert camelCase to kebab-case
    const formattedName = lowercaseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    // Use relative path from the current file
    const iconPath = new URL(`../assets/icons/${formattedName}.svg`, import.meta.url).href;
    
    return iconPath;
  } catch (error) {
    console.error(`Error loading icon: ${iconName}`, error);
    return PlaceholderSvg; // Return placeholder icon if there's an error
  }
};

function CollapsibleSection({ title, children, defaultExpanded = false, sectionKey }: { title: string, children: React.ReactNode, defaultExpanded?: boolean, sectionKey: string }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState<string | number>(expanded ? 'auto' : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChildren, setShowChildren] = useState(expanded);
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

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (expanded) {
      setShowChildren(true);
      setIsTransitioning(true);
      setHeight(0);
      requestAnimationFrame(() => {
        setHeight(content.scrollHeight);
      });
      const handle = setTimeout(() => {
        setHeight('auto');
        setIsTransitioning(false);
      }, 200);
      return () => clearTimeout(handle);
    } else {
      if (height === 'auto') {
        setHeight(content.scrollHeight);
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setHeight(0);
        });
      } else {
        setIsTransitioning(true);
        setHeight(0);
      }
      const handle = setTimeout(() => {
        setIsTransitioning(false);
        setShowChildren(false);
      }, 200);
      return () => clearTimeout(handle);
    }
    // eslint-disable-next-line
  }, [expanded]);

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
          width: 'calc(100% - 16px)', // Account for the 8px padding on each side
          background: isHovered ? '#e1e1e1' : 'none',
          border: 'none',
          padding: '8px 8px',
          margin: '0 8px',
          cursor: 'pointer',
          font: 'inherit',
          borderRadius: 8,
          transition: 'background 0.2s',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        className="nav-section-button"
        aria-expanded={expanded}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <IconWrapper
          icon={ChevronSvg}
          aria-hidden
          style={{
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            marginRight: 8,
            color: '#6E6E6E',
            width: 10,
            height: 10,
            flexShrink: 0,
          }}
        />
        <Text UNSAFE_style={{ fontWeight: 500, color: '#444', fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</Text>
      </button>
      <div
        ref={contentRef}
        style={{
          height: height,
          overflow: 'hidden',
          transition: isTransitioning ? 'height 0.2s cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
          width: '100%',
        }}
        aria-hidden={!expanded}
      >
        {showChildren && children}
      </div>
    </div>
  );
}

function renderNavItems(items: any[], parentKey = '', selectedKey: string, onSelect: (key: string) => void, hoveredKey: string | null, setHoveredKey: (key: string | null) => void) {
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
            width: 'calc(100% - 16px)', // Account for the 8px padding on each side
            background: 'none',
            border: 'none',
            padding: '3px 3px',
            margin: '0 8px',
            cursor: 'pointer',
            borderRadius: 8,
            transition: 'background 0.2s',
            marginBottom: 2,
            outline: 'none',
          }}
          className="nav-item-button"
          onMouseEnter={() => setHoveredKey(key)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 8,
              background: selected
                ? '#000'
                : hovered
                ? '#e1e1e1'
                : 'none',
              transition: 'background 0.2s',
            }}
          >
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
          </span>
          <Text
            UNSAFE_style={{
              marginLeft: 12,
              color: '#222',
              fontWeight: 500,
              fontSize: 14,
              flex: 1,
              textAlign: 'left',
            }}
          >
            {item.label}
          </Text>
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
        >
          <Flex direction="column">
            {renderNavItems(item.items, key + '-', selectedKey, onSelect, hoveredKey, setHoveredKey)}
          </Flex>
        </CollapsibleSection>
      );
    }
    return null;
  });
}

function Navigation() {
  const [selectedKey, setSelectedKey] = useState('Home-0');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  return (
    <Flex direction="column">
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
          setHoveredKey
        )}
      </Flex>
      {renderNavItems(
        navData.filter((item: any) => item.type === 'section'),
        '',
        selectedKey,
        setSelectedKey,
        hoveredKey,
        setHoveredKey
      )}
    </Flex>
  )
}

export default Navigation 