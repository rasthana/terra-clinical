import React, { PropTypes } from 'react';

import ActionHeader from 'terra-clinical-action-header';
import AppDelegate from 'terra-clinical-app-delegate';

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
    this.props.app.minimize();
  }

  render() {
    const { app, title, children, ...customProps } = this.props;

    let onClose;
    if (app.closeDisclosure) {
      onClose = this.closeDisclosure;
    }

    let onBack;
    if (app.goBack) {
      onBack = app.goBack;
    }

    let onMaximize;
    if (app.maximize) {
      onMaximize = this.maximize;
    }

    let onMinimize;
    if (app.minimize) {
      onMinimize = this.minimize;
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
  app: AppDelegate.propType,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default NavigationHeader;
