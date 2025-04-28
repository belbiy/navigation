import React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import { Flex, Text, Button, Item, ListView, View } from '@adobe/react-spectrum';
import { useNavigate } from 'react-router-dom';
import HomeSvg from '../assets/icons/Home.svg';
import PagesSvg from '../assets/icons/WebPages.svg';
import UserEditSvg from '../assets/icons/User.svg';
import WorkflowAddSvg from '../assets/icons/Workflow.svg';
import ViewGridSvg from '../assets/icons/ViewGridFluid.svg';
import ViewListSvg from '../assets/icons/Collection.svg';
import ViewStackSvg from '../assets/icons/Models.svg';
import ViewDetailSvg from '../assets/icons/Data.svg';
import WorkflowSvg from '../assets/icons/Workflow.svg';
import VideoOutlineSvg from '../assets/icons/VideoOutline.svg';
import TextEditSvg from '../assets/icons/TextEdit.svg';
import WrenchSvg from '../assets/icons/Wrench.svg';
import TreeExpandSvg from '../assets/icons/TreeExpand.svg';
import navData from '../navigation.json'

interface IconWrapperProps {
  icon: string;
  size?: string;
  style?: React.CSSProperties;
  UNSAFE_style?: React.CSSProperties;
  'aria-hidden'?: boolean;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon, 
  size, 
  style, 
  UNSAFE_style,
  'aria-hidden': ariaHidden,
  className,
  ...props 
}) => {
  return (
    <img
      src={icon}
      style={{...style, ...UNSAFE_style}}
      aria-hidden={ariaHidden}
      className={className}
      {...props}
    />
  );
};

const iconMap: Record<string, string> = {
  Home: HomeSvg,
  Pages: PagesSvg,
  'Sites Editor': UserEditSvg,
  'Generate variations': WorkflowAddSvg,
  Assets: ViewGridSvg,
  Collections: ViewListSvg,
  Blocks: ViewStackSvg,
  'Content fragments': ViewDetailSvg,
  'Experience fragments': WorkflowSvg,
  'Dynamic media templates': VideoOutlineSvg,
  Forms: TextEditSvg,
  Tools: WrenchSvg,
  ChevronRight: TreeExpandSvg,
};

function CollapsibleSection({ title, children, defaultExpanded = false, sectionKey }: { title: string, children: React.ReactNode, defaultExpanded?: boolean, sectionKey: string }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(expanded ? 'auto' : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showChildren, setShowChildren] = useState(expanded);

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
    <div key={sectionKey}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '8px 0',
          cursor: 'pointer',
          font: 'inherit',
          outline: 'none',
        }}
        aria-expanded={expanded}
        onClick={() => setExpanded(e => !e)}
      >
        <IconWrapper
          icon={TreeExpandSvg}
          aria-hidden
          style={{
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            marginRight: 8,
            color: '#6E6E6E',
            width: 20,
            height: 20,
          }}
        />
        <Text UNSAFE_style={{ fontWeight: 500, color: '#444', fontSize: 14 }}>{title}</Text>
      </button>
      <div
        ref={contentRef}
        style={{
          height: height,
          overflow: 'hidden',
          transition: isTransitioning ? 'height 0.2s cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
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
      const Icon = iconMap[item.icon] || null;
      const selected = selectedKey === key;
      const hovered = hoveredKey === key;
      return (
        <button
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: 'none',
            border: 'none',
            padding: '3px 16px',
            cursor: 'pointer',
            borderRadius: 8,
            transition: 'background 0.2s',
            marginBottom: 2,
            outline: 'none',
          }}
          onClick={() => onSelect(key)}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(key);
            }
          }}
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
            {Icon && (
              <IconWrapper
                icon={Icon}
                UNSAFE_style={{ 
                  maxWidth: 20, 
                  maxHeight: 20, 
                  filter: selected ? 'brightness(0) invert(1)' : 'none', 
                  transition: 'filter 0.2s' 
                }}
              />
            )}
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