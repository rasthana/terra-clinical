import React, { PropTypes } from 'react';
import Button from 'terra-button';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import IconMaximize from 'terra-icon/lib/icon/IconMaximize';

import AppDelegate from '../app-delegate/AppDelegate';

import './NavigationHeader.scss';

const NavigationHeader = ({
  app,
  title,
  children,
  hasBottomBorder,
  }) => {
  if (!app) {
    return (
      <header className="terra-NavigationHeader" />
    );
  }

  let headerCloseButton;
  if (app.closeDisclosure) {
    headerCloseButton = <Button onClick={() => { app.closeDisclosure(); }} icon={<IconClose />} />;
  }

  let headerBackButton;
  if (app.goBack) {
    headerBackButton = <Button onClick={() => { app.goBack(); }} icon={<IconLeft />} />;
  }

  let maximizeButton;
  if (app.maximize) {
    maximizeButton = <Button onClick={() => { app.maximize(); }} icon={<IconMaximize />} />;
  }

  let className = 'terra-NavigationHeader';
  if (hasBottomBorder) {
    className = `${className} terra-NavigationHeader--borderBottom`;
  }

  return (
    <header className={className}>
      <span className="terra-NavigationHeader-start">
        {headerBackButton}
        {maximizeButton}
        <h2>{title}</h2>
      </span>
      <span className="terra-NavigationHeader-end">
        {children}
        {headerCloseButton}
      </span>
    </header>
  );
};

NavigationHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  app: AppDelegate.propType,
  hasBottomBorder: PropTypes.bool,
};

export default NavigationHeader;
