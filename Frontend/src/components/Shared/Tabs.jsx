import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Tabs.css';

const Tabs = ({
  tabs,
  defaultTab = 0,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  const tabClasses = [
    'tabs',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={tabClasses}>
      <div className="tabs__header" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tabs__tab ${index === activeTab ? 'tabs__tab--active' : ''}`}
            onClick={() => handleTabClick(index)}
            role="tab"
            aria-selected={index === activeTab}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
            type="button"
          >
            {tab.icon && <span className="tabs__icon">{tab.icon}</span>}
            <span className="tabs__label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tabs__panel ${index === activeTab ? 'tabs__panel--active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            id={`tab-panel-${index}`}
            hidden={index !== activeTab}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  defaultTab: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Tabs; 