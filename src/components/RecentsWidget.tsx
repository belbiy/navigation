import React, { useState, useEffect, useRef } from 'react';
import { TableView, TableHeader, TableBody, Row, Cell, Column, Avatar, StatusLight, Link } from '@react-spectrum/s2';
import { View } from '@adobe/react-spectrum';
import { SortDescriptor } from '@react-types/shared';
import Widget from "./Widget";
import recentItems from '../data/recents-aem.json';

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'live': return 'positive';
    case 'draft': return 'neutral';
    case 'approved': return 'positive';
    case 'pending': return 'notice';
    case 'overdue': return 'negative';
    default: return 'neutral';
  }
};

const RecentsWidget: React.FC = () => {
  // Sort state with proper typing
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'lastModified',
    direction: 'descending'
  });
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Set the width of the container on mount and when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current && wrapperRef.current.parentElement) {
        const parentWidth = wrapperRef.current.parentElement.clientWidth;
        setContainerWidth(parentWidth);
      }
    };
    
    // Initial width update
    updateWidth();
    
    // Add resize listener
    window.addEventListener('resize', updateWidth);
    
    // Clean up the listener on unmount
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Sort items based on current sort descriptor
  const sortedItems = [...recentItems].sort((a, b) => {
    if (!sortDescriptor.column) return 0;
    
    const column = sortDescriptor.column.toString() as keyof typeof recentItems[0];
    let result = 0;
    
    // Compare based on column - convert dates for proper comparison
    if (column === 'lastModified') {
      // Simple date parsing for typical date formats in the data
      const getTimestamp = (dateStr: string) => {
        if (dateStr.includes('hours ago') || dateStr.includes('days ago')) {
          return Date.now(); // Just for demo - treat recent items as very recent
        }
        return new Date(dateStr).getTime();
      };
      
      // For ascending order of dates (oldest first)
      result = getTimestamp(a.lastModified) - getTimestamp(b.lastModified);
    } else {
      // String comparison for other columns
      result = String(a[column]).localeCompare(String(b[column]));
    }
    
    // Apply sort direction
    return sortDescriptor.direction === 'ascending' ? result : -result;
  });

  // Updated handler to accept SortDescriptor
  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  };

  return (
    <Widget title="Recents">
      <div 
        ref={wrapperRef}
        style={{ 
          width: '100%', 
          maxWidth: '100%',
          overflow: 'hidden' 
        }}
      >
        <div style={{ 
          width: containerWidth > 0 ? `${containerWidth}px` : '100%', 
          overflowX: 'auto'
        }}>
          <TableView 
            aria-label="Recent items"
            sortDescriptor={sortDescriptor}
            onSortChange={handleSortChange}
            UNSAFE_style={{ 
              width: '100%'
            }}
          >
            <TableHeader>
              <Column key="name" allowsSorting>Name</Column>
              <Column key="type" allowsSorting>Type</Column>
              <Column key="status" allowsSorting>Status</Column>
              <Column key="createdBy" allowsSorting>Created by</Column>
              <Column key="lastModified" allowsSorting>Last modified</Column>
            </TableHeader>
            <TableBody>
              {sortedItems.map(item => (
                <Row key={item.id}>
                  <Cell showDivider>
                    <Link href={item.link}>
                      {item.name}
                    </Link>
                  </Cell>
                  <Cell>{item.type}</Cell>
                  <Cell>
                    <StatusLight variant={getStatusVariant(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </StatusLight>
                  </Cell>
                  <Cell>
                    <View UNSAFE_style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar src={item.createdBy.avatar} alt={item.createdBy.name} />
                      <span>{item.createdBy.name}</span>
                    </View>
                  </Cell>
                  <Cell>{item.lastModified}</Cell>
                </Row>
              ))}
            </TableBody>
          </TableView>
        </div>
      </div>
    </Widget>
  );
};

export default RecentsWidget;