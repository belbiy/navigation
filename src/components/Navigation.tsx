import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Flex, Text, View } from '@adobe/react-spectrum';
import { useKeyboard, usePress } from '@react-aria/interactions';
import { useFocusable } from '@react-aria/focus';
import ChevronSvg from '../assets/icons/Chevron.svg';
import PlaceholderSvg from '../assets/icons/Placeholder.svg';
import SimpleOverlay from './SimpleOverlay';
import StoresOverlay from './StoresOverlay';
import SystemOverlay from './SystemOverlay';
import ToolsOverlay from './ToolsOverlay';
import { useNavigationContext } from '../context/NavigationContext';


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
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
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

  // Update content height when expanded changes
  React.useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [expanded, children]);

  return (
    <div key={sectionKey} style={{ width: '100%', margin: '4px 0 4px 0' }}>
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
          margin: '12px 8px 0 8px',
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
              width: 12,
              height: 12,
              opacity: 0.7,
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
            marginLeft: '8px'
          }}
        >
          <Text UNSAFE_style={{ 
            fontWeight: 500, 
            color: '#666', 
            fontSize: 14,
          }}>
            {title}
          </Text>
        </div>
      </button>
      <div 
        ref={contentRef}
        style={{ 
          width: '100%',
          height: expanded ? contentHeight : 0,
          overflow: 'hidden',
          transition: 'height 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Add an interface to track active overlay
interface ActiveOverlay {
  itemKey: string | null;
  buttonRef: React.RefObject<HTMLButtonElement> | null;
}


function renderNavItems(
  items: any[], 
  parentKey = '', 
  selectedKey: string, 
  onSelect: (key: string) => void, 
  hoveredKey: string | null, 
  setHoveredKey: (key: string | null) => void, 
  isExpanded: boolean, 
  isBottomSection = false,
  activeOverlay: ActiveOverlay,
  setActiveOverlay: (overlay: ActiveOverlay) => void
  
) {
  return items.map((item, idx) => {
    const key = `${parentKey}${item.label.replace(/\s+/g, '-')}-${idx}`;
    if (item.type === 'item') {
      const iconPath = getIconPath(item.icon);
      const selected = selectedKey === key;
      const buttonRef = useRef<HTMLButtonElement>(null);
      
      // Check if this item has an active overlay
      const hasActiveOverlay = activeOverlay.itemKey === key;
      
      // Either selected normally or has open overlay
      const isActive = selected || hasActiveOverlay; 
      const hovered = hoveredKey === key && !hasActiveOverlay; // Don't show hover effect when overlay is open
      
      const { focusableProps } = useFocusable({}, buttonRef);
      const { keyboardProps } = useKeyboard({
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (isBottomSection) {
              toggleOverlay(key, buttonRef);
            } else {
              onSelect(key);
            }
          }
        }
      });
      
      // Function to toggle overlay for this item
      const toggleOverlay = (itemKey: string, ref: React.RefObject<HTMLButtonElement>) => {
        if (activeOverlay.itemKey === itemKey) {
          // Close the overlay if it's already open
          setActiveOverlay({ itemKey: null, buttonRef: null });
        } else {
          // Open this item's overlay and close any other open overlay
          setActiveOverlay({ itemKey, buttonRef: ref });
        }
      };
      
      const { pressProps } = usePress({
        onPress: () => {
          if (isBottomSection) {
            toggleOverlay(key, buttonRef);
          } else {
            onSelect(key);
          }
        }
      });

      const button = (
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
            background: isActive
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
                filter: isActive ? 'brightness(0) invert(1)' : 'none', 
                transition: 'filter 0.2s' 
              }}
              onError={(e) => {
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

      if (isBottomSection) {
        // Check which menu item was clicked
        const isStoresItem = item.id === 'stores' || item.label.toLowerCase() === 'stores';
        const isSystemItem = item.id === 'system' || item.label.toLowerCase() === 'system';
        const isToolsItem = item.id === 'all-tools' || item.label.toLowerCase() === 'all tools';
        
        return (
          <View key={key}>
            {button}
            {hasActiveOverlay && (
              <SimpleOverlay 
                targetRef={buttonRef} 
                isOpen={hasActiveOverlay} 
                onClose={() => setActiveOverlay({ itemKey: null, buttonRef: null })}
                isNavigationCollapsed={!isExpanded}
              >
                {isStoresItem && <StoresOverlay />}
                {isSystemItem && <SystemOverlay />}
                {isToolsItem && <ToolsOverlay />}
                {!isStoresItem && !isSystemItem && !isToolsItem && (
                  <View 
                    padding="size-200" 
                    width="size-4600"
                    maxHeight="size-6000"
                    overflow="auto"
                    UNSAFE_style={{
                      background: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    <Text>Content for {item.label}</Text>
                  </View>
                )}
              </SimpleOverlay>
            )}
          </View>
        );
      }

      return button;
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
            {renderNavItems(item.items, key + '-', selectedKey, onSelect, hoveredKey, setHoveredKey, isExpanded, false, activeOverlay, setActiveOverlay)}
          </Flex>
        </CollapsibleSection>
      );
    }
    return null;
  });
}

interface NavigationProps {
  isExpanded: boolean;
  navigationData: any[];
}

const Navigation: React.FC<NavigationProps> = ({ navigationData}) => {
  const [selectedKey, setSelectedKey] = useState('Home-0');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>({ itemKey: null, buttonRef: null });

  const { isNavigationExpanded } = useNavigationContext();
  let isExpanded = isNavigationExpanded;
  
  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        activeOverlay.itemKey && 
        activeOverlay.buttonRef && 
        !activeOverlay.buttonRef.current?.contains(e.target as Node)
      ) {
        // Don't close immediately, let SimpleOverlay handle its own clicks
        // This prevents immediate closing when clicking inside the overlay
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeOverlay]);
  
  return (
    <Flex
      direction="column"
      UNSAFE_style={{
        width: isExpanded ? '240px' : '58px',
        minWidth: 0,
        zIndex: 10,
        position: 'relative',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden'
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
      <style>
        {`
          .nav-section-scrollable {
            scrollbar-color:  transparent transparent ;
            overflow-x: hidden;
            overflow-y: auto;
            flex: 1;
            height: 100%;
          }
          .nav-section-scrollable:hover {
            scrollbar-color: gray transparent;
          }
        `}
      </style>
      <div className="nav-section-scrollable">
        <Flex direction="column">
          {renderNavItems(
            navigationData.filter((item: any) => item.type === 'item'),
            '',
            selectedKey,
            setSelectedKey,
            hoveredKey,
            setHoveredKey,
            isExpanded,
            false,
            activeOverlay,
            setActiveOverlay
          )}
        </Flex>
        {renderNavItems(
          navigationData.filter((item: any) => item.type === 'section'),
          '',
          selectedKey,
          setSelectedKey,
          hoveredKey,
          setHoveredKey,
          isExpanded,
          false,
          activeOverlay,
          setActiveOverlay
        )}
      </div>
      {navigationData.filter((item: any) => item.type === 'bottomsection').flatMap((section: any) => section.items || []).length > 0 && (
        <Flex 
          direction="column" 
          UNSAFE_style={{ 
            padding: '8px 0 16px 0',
            marginTop: '8px'
          }}
        >
          {renderNavItems(
            navigationData.filter((item: any) => item.type === 'bottomsection').flatMap((section: any) => section.items || []),
            'bottom-',
            selectedKey,
            setSelectedKey,
            hoveredKey,
            setHoveredKey,
            isExpanded,
            true,
            activeOverlay,
            setActiveOverlay
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Navigation; 