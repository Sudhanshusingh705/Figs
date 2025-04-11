import React from 'react';
import PropTypes from 'prop-types';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  fluid = false, 
  as: Component = 'div', 
  padding = true 
}) => {
  return (
    <Component 
      className={`${fluid ? 'container-fluid' : 'container'} ${padding ? 'py-4 px-3 py-md-5' : ''} ${className}`}
    >
      {children}
    </Component>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  as: PropTypes.elementType,
  padding: PropTypes.bool
};

export default ResponsiveContainer; 