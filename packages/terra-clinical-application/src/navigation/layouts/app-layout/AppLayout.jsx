import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';

import AppDelegate from '../../core/app-delegate/AppDelegate';

import NavigationHeader from '../../core/navigation-header/NavigationHeader';
import ContentContainer from '../../../generic-components/content-container/ContentContainer';

import NavStack from '../../../generic-components/nav-stack/NavStack';
import { componentFromDiscloseOptions } from '../../core/util/NavigatorUtils';

import './AppLayout.scss';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);

    this.modalShouldBeFullscreen = false;

    this.updateFullscreenState = this.updateFullscreenState.bind(this);
    this.childDisclose = this.childDisclose.bind(this);
    this.childDismiss = this.childDismiss.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);

    this.state = {
      isOpen: false,
      isFullscreen: false,
      size: 'small',
      componentStack: [],
    };
  }

  componentDidMount() {
    this.updateFullscreenState();

    window.addEventListener('resize', () => {
      this.updateFullscreenState();
    });
  }

  updateFullscreenState() {
    const currentFullscreenValue = this.modalShouldBeFullscreen;

    this.modalShouldBeFullscreen = window.innerWidth < 1024;

    if (this.state.isOpen && currentFullscreenValue !== this.modalShouldBeFullscreen) {
      this.forceUpdate();
    }
  }

  childDisclose(options) {
    if (options.fallbackUrl) {
      if (this.props.app && this.props.app.disclose) {
        const modifiedOptions = Object.assign({}, options);
        modifiedOptions.content = undefined;

        this.props.app.disclose(modifiedOptions);

        return;
      }
    }

    this.open(options);
  }

  childDismiss(options) {
    if (this.props.app && this.props.app.dismiss) {
      this.props.app.dismiss(options);
    }
  }

  open(options) {
    const newContent = componentFromDiscloseOptions(options);
    if (!newContent) { return; }

    const appDelegate = new AppDelegate({
      disclose: this.push,
      dismiss: this.close,
      closeDisclosure: this.close,
      goBack: undefined,
    });

    const newState = {
      isOpen: true,
      size: options.size || 'small',
      componentStack: [React.cloneElement(newContent, { app: appDelegate })],
    };

    this.setState(newState);
  }

  close() {
    const newState = {
      isOpen: false,
      size: 'small',
      componentStack: [],
    };

    this.setState(newState);
  }

  push(options) {
    const newContent = componentFromDiscloseOptions(options);
    if (!newContent) { return; }

    const newComponentStack = Object.assign([], this.state.componentStack);

    const appDelegate = new AppDelegate({
      disclose: this.push,
      dismiss: this.pop,
      closeDisclosure: this.close,
      goBack: this.pop,
    });

    newComponentStack.push(React.cloneElement(newContent, { app: appDelegate }));

    const newState = {
      componentStack: newComponentStack,
    };

    this.setState(newState);
  }

  pop() {
    if (this.state.componentStack.length > 1) {
      const newComponentStack = Object.assign([], this.state.componentStack);

      newComponentStack.pop();

      const newState = {
        componentStack: newComponentStack,
      };

      this.setState(newState);
    }
  }

  render() {
    const modalClassNames = classNames([
      'terra-AppLayout-modal',
      { 'terra-AppLayout-modal--small': !this.modalShouldBeFullscreen && this.state.size === 'small' },
      { 'terra-AppLayout-modal--large': !this.modalShouldBeFullscreen && this.state.size === 'large' },
      { 'terra-AppLayout-modal--fullscreen': this.modalShouldBeFullscreen },
    ]);

    return (
      <div className="terra-AppLayout">
        {React.Children.map(this.props.children, (child) => {
          const appDelegate = AppDelegate.mergeDelegate(this.props.app, {
            disclose: this.childDisclose,
            dismiss: this.close,
          });

          return React.cloneElement(child, { app: appDelegate });
        })}
        <Modal
          isOpen={this.state.isOpen}
          className={modalClassNames}
          overlayClassName="terra-AppLayout-modalOverlay"
          contentLabel=""
        >
          <NavStack items={this.state.componentStack} />
        </Modal>
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.node,
  app: PropTypes.instanceOf(AppDelegate),
};

export default AppLayout;
