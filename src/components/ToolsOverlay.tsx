import React from 'react';
import { View, Text } from '@adobe/react-spectrum';
import toolsData from '../data/navigation-aem-tools.json';

interface MenuItem {
  id: string;
  label: string;
}

interface MenuGroup {
  group: string;
  items: MenuItem[];
}

const ToolsOverlay: React.FC = () => {
  const handleItemClick = (id: string, label: string) => {
    console.log(`Tools item clicked: ${label} (${id})`);
    // Here you would add navigation or other actions
  };
  
  // Divide the data into four columns
  const columnCount = 4;
  const groupsPerColumn = Math.ceil(toolsData.length / columnCount);
  
  const columns = [
    toolsData.slice(0, groupsPerColumn),
    toolsData.slice(groupsPerColumn, groupsPerColumn * 2),
    toolsData.slice(groupsPerColumn * 2, groupsPerColumn * 3),
    toolsData.slice(groupsPerColumn * 3)
  ];
  
  // Render a menu item button
  const renderMenuItem = (item: MenuItem) => {
    return (
      <button
        key={item.id}
        onClick={() => handleItemClick(item.id, item.label)}
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
            fontSize: '13px',
            fontWeight: 500,
            color: '#707070',
            marginBottom: '6px',
            display: 'block',
            padding: '0 8px',
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
    >
      <View UNSAFE_style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '24px',
      }}>
        <View UNSAFE_style={{ width: '250px', flex: '0 0 250px' }}>
          {renderColumn(columns[0])}
        </View>
        <View UNSAFE_style={{ width: '250px', flex: '0 0 250px' }}>
          {renderColumn(columns[1])}
        </View>
        <View UNSAFE_style={{ width: '250px', flex: '0 0 250px' }}>
          {renderColumn(columns[2])}
        </View>
        <View UNSAFE_style={{ width: '250px', flex: '0 0 250px' }}>
          {renderColumn(columns[3])}
        </View>
      </View>
    </View>
  );
};

export default ToolsOverlay; 