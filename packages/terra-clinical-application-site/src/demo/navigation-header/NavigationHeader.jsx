import React, { PropTypes } from 'react';
import Button from 'terra-button';
import IconClose from 'terra-icon/lib/icon/IconClose';
import IconLeft from 'terra-icon/lib/icon/IconLeft';
import IconMaximize from 'terra-icon/lib/icon/IconMaximize';
import IconMinimize from 'terra-icon/lib/icon/IconMinimize';

import AppDelegate from 'terra-clinical-app-delegate';

import './NavigationHeader.scss';

const NavigationHeader = ({
  app,
  title,
  children,
  hasBottomBorder,
  }) => {
  if (!app) {
    return (
      <header className="terraClinical-NavigationHeader">
        <h2>{title}</h2>
      </header>
    );
  }

  let headerCloseButton;
  if (app.closeDisclosure) {
    headerCloseButton = <Button onClick={() => { app.closeDisclosure(); }} icon={<IconClose />} />;
  }

  let headerBackButton;
  if (app.canGoBack) {
    headerBackButton = <Button onClick={() => { app.dismiss(); }} icon={<IconLeft />} />;
  }

  let maximizeButton;
  if (app.maximize) {
    const maximizeButtonIcon = (app.isMaximized) ? <IconMinimize /> : <IconMaximize />;
    maximizeButton = <Button onClick={() => { app.maximize(); }} icon={maximizeButtonIcon} />;
  }

  let className = 'terraClinical-NavigationHeader';
  if (hasBottomBorder) {
    className = `${className} terraClinical-NavigationHeader--borderBottom`;
  }

  return (
    <header className={className}>
      <span className="terraClinical-NavigationHeader-start">
        {headerBackButton}
        {maximizeButton}
        <div className="terraClinical-NavigationHeader-start-title">
          <h2>{title}</h2>
        </div>
      </span>
      <span className="terraClinical-NavigationHeader-end">
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
