import React from 'react';
import { View, Text } from '@adobe/react-spectrum';

interface MenuItem {
  id: string;
  label: string;
}

interface MenuGroup {
  group: string;
  items: MenuItem[];
}

interface MenuOverlayProps {
  data: MenuGroup[];
  onItemClick?: (id: string, label: string) => void;
}

/**
 * A reusable component for displaying grouped menu items in an overlay.
 * Can be used for both Stores and System overlays.
 */
const MenuOverlay: React.FC<MenuOverlayProps> = ({ data, onItemClick = () => {} }) => {
  // Splitting the data into two columns
  const midpoint = Math.ceil(data.length / 2);
  const leftColumn = data.slice(0, midpoint);
  const rightColumn = data.slice(midpoint);

  // Render a menu item button
  const renderMenuItem = (item: MenuItem) => {
    return (
      <button
        key={item.id}
        onClick={() => onItemClick(item.id, item.label)}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          padding: '8px 10px',
          margin: '0',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '14px',
          lineHeight: '20px',
          color: '#333',
          fontWeight: 500,
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#F5F5F5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {item.label}
      </button>
    );
  };

  // Render a column of menu groups
  const renderColumn = (groups: MenuGroup[]) => {
    return groups.map((group, index) => (
      <View key={`group-${index}`} marginBottom="size-300">
        <Text 
          UNSAFE_style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#707070',
            marginBottom: '6px',
            display: 'block',
            padding: '0 8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {group.group}
        </Text>
        <div style={{ marginBottom: '12px' }}>
          {group.items.map(renderMenuItem)}
        </div>
      </View>
    ));
  };

  return (
    <View
      borderRadius="medium"
      padding="size-300"
      width="size-5000"
    >
      <View UNSAFE_style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
        <View flex>
          {renderColumn(leftColumn)}
        </View>
        <View flex>
          {renderColumn(rightColumn)}
        </View>
      </View>
    </View>
  );
};

export default MenuOverlay; 