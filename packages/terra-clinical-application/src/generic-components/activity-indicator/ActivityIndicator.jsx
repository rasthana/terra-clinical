import React from 'react';
import IconSpinner from 'terra-icon/lib/icon/IconSpinner';

import './ActivityIndicator.scss';

const ActivityIndicator = () => (
  <div className="orion-ActivityIndicator" tabIndex="-1">
    <div className="orion-ActivityIndicator-content" style={{ fontSize: '24px' }}>
      <IconSpinner isSpin />
      <span style={{ paddingLeft: '5px' }}>Loading</span>
    </div>
  </div>
);

export default ActivityIndicator;
