import React, { ReactNode } from 'react';
import { View } from '@adobe/react-spectrum';

interface WidgetProps {
  /**
   * The title to display at the top of the widget
   */
  title?: string;
  
  /**
   * Any content to render inside the widget
   */
  children: ReactNode;
  
  /**
   * Optional width override
   */
  width?: string;
  
  /**
   * Optional additional CSS class name
   */
  className?: string;
}

/**
 * A reusable widget component that can wrap any content.
 * Uses Spectrum V2 styling for consistency.
 */
const Widget: React.FC<WidgetProps> = ({ 
  title, 
  children, 
  width = "100%",
  className
}) => {
  return (
    <View
      borderRadius="large"
      width={width}
      backgroundColor="gray-50"
      borderWidth="thin"
      borderColor="gray-200"
      UNSAFE_className={className}
      UNSAFE_style={{padding: "16px 24px"}}
    >
      {title && (
        <>
          <div style={{fontSize: "18px", marginBottom: "16px", fontWeight: "bold"}}>{title}</div>
        </>
      )}
      <div>
        {children}
      </div>
    </View>
  );
};

export default Widget; 