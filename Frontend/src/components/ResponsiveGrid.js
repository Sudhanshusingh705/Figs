import React from 'react';
import PropTypes from 'prop-types';

// ResponsiveRow component
export const ResponsiveRow = ({ 
  children, 
  className = '', 
  gap = 3, 
  alignItems = 'stretch', 
  justifyContent = 'flex-start'
}) => {
  return (
    <div 
      className={`row g-${gap} align-items-${alignItems} justify-content-${justifyContent} ${className}`}
    >
      {children}
    </div>
  );
};

ResponsiveRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gap: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  alignItems: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
  justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'evenly', 'flex-start'])
};

// ResponsiveCol component
export const ResponsiveCol = ({ 
  children, 
  className = '', 
  xs = 12, 
  sm, 
  md, 
  lg, 
  xl,
  order
}) => {
  // Build class name based on props
  let colClassName = `col-${xs}`;
  if (sm) colClassName += ` col-sm-${sm}`;
  if (md) colClassName += ` col-md-${md}`;
  if (lg) colClassName += ` col-lg-${lg}`;
  if (xl) colClassName += ` col-xl-${xl}`;
  if (order) colClassName += ` order-${order}`;
  
  return (
    <div className={`${colClassName} ${className}`}>
      {children}
    </div>
  );
};

ResponsiveCol.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  order: PropTypes.number
};

// Responsive Grid component (wraps Row and multiple Cols)
const ResponsiveGrid = ({ 
  children, 
  columns = {xs: 1, sm: 2, md: 3, lg: 4},
  className = '',
  gap = 3,
  items = []
}) => {
  const { xs = 1, sm, md, lg, xl } = columns;
  
  // Calculate column width based on number of columns
  const getColumnWidth = (cols) => {
    return cols ? 12 / cols : 12;
  };
  
  const xsWidth = getColumnWidth(xs);
  const smWidth = getColumnWidth(sm);
  const mdWidth = getColumnWidth(md);
  const lgWidth = getColumnWidth(lg);
  const xlWidth = getColumnWidth(xl);
  
  // If children are provided, render them directly
  if (children) {
    return (
      <div className={`row g-${gap} ${className}`}>
        {children}
      </div>
    );
  }
  
  // Otherwise, map through items and render them in responsive columns
  return (
    <div className={`row g-${gap} ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={`col-${xsWidth} ${sm ? `col-sm-${smWidth}` : ''} ${md ? `col-md-${mdWidth}` : ''} ${lg ? `col-lg-${lgWidth}` : ''} ${xl ? `col-xl-${xlWidth}` : ''}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

ResponsiveGrid.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  className: PropTypes.string,
  gap: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  items: PropTypes.array
};

export default ResponsiveGrid; 