import React, { PropTypes } from 'react';

import ActionHeader from 'terra-clinical-action-header';
import AppDelegate from 'terra-clinical-app-delegate';

import './NavigationHeader.scss';

class NavigationHeader extends React.Component {
  constructor(props) {
    super(props);

    this.closeDisclosure = this.closeDisclosure.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.maximize = this.maximize.bind(this);
    this.minimize = this.minimize.bind(this);
  }

  closeDisclosure() {
    this.props.app.closeDisclosure();
  }

  dismiss() {
    this.props.app.dismiss();
  }

  maximize() {
    this.props.app.maximize();
  }

  minimize() {
    this.props.app.maximize();
  }

  render() {
    const { app, title, children, ...customProps } = this.props;

    let onClose;
    if (app.closeDisclosure) {
      onClose = this.closeDisclosure;
    }

    let onBack;
    if (app.canGoBack) {
      onBack = this.dismiss;
    }

    let onMaximize;
    let onMinimize;
    if (app.maximize && !app.isMaximized) {
      onMaximize = this.maximize;
    } else if (app.maximize && app.isMaximized) {
      onMinimize = this.maximize;
    }

    return (
      <ActionHeader
        title={title}
        onClose={onClose}
        onBack={onBack}
        onMaximize={onMaximize}
        onMinimize={onMinimize}
        {...customProps}
      >
        {children}
      </ActionHeader>
    );
  }
}

NavigationHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  app: AppDelegate.propType,
  hasBottomBorder: PropTypes.bool,
};

export default NavigationHeader;
