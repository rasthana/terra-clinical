import React, { PropTypes } from 'react';
import SlidePanel from 'terra-slide-panel';

import AppDelegate from '../../core/app-delegate/AppDelegate';

import NavStack from '../../../generic-components/nav-stack/NavStack';
import { componentFromDiscloseOptions } from '../../core/util/NavigatorUtils';

class SlidePanelLayout extends React.Component {

  constructor(props) {
    super(props);

    this.mainDisclose = this.mainDisclose.bind(this);
    this.mainDismiss = this.mainDismiss.bind(this);
    this.pushMainComponent = this.pushMainComponent.bind(this);
    this.popMainComponent = this.popMainComponent.bind(this);

    this.panelDisclose = this.panelDisclose.bind(this);
    this.openSlidePanel = this.openSlidePanel.bind(this);
    this.closeSlidePanel = this.closeSlidePanel.bind(this);
    this.pushSlidePanelComponent = this.pushSlidePanelComponent.bind(this);
    this.popSlidePanelComponent = this.popSlidePanelComponent.bind(this);
    this.maximizeSlidePanel = this.maximizeSlidePanel.bind(this);

    this.state = {
      slidePanel: {
        isOpen: false,
        size: 'small',
        behavior: 'squish',
        componentStack: [],
      },
      main: {
        componentStack: React.Children.map(props.children, (component, index) => {
          const appDelegate = new AppDelegate({
            disclose: this.mainDisclose,
            dismiss: (index > 0) ? this.mainDismiss : this.popMainComponent,
            closeDisclosure: undefined,
            goBack: (index > 0) ? this.popMainComponent : undefined,
          });

          return React.cloneElement(component, { app: appDelegate });
        }),
      },
    };
  }

  maximizeSlidePanel() {
    const isSlidePanelMaximized = this.state.slidePanel.isFullscreen;

    const newState = Object.assign({}, this.state.slidePanel);
    newState.isFullscreen = !isSlidePanelMaximized;

    this.setState({ slidePanel: newState });
  }

  mainDisclose(options) {
    if (options.preferredType === 'panel') {
      this.openSlidePanel(options);
    } else if (options.preferredType === 'main') {
      this.pushMainComponent(options);
    } else if (this.props.app && this.props.app.disclose) {
      this.props.app.disclose(options);
    } else {
      this.openSlidePanel(options);
    }
  }

  mainDismiss(options) {
    if (this.props.app && this.props.app.dismiss) {
      this.props.app.dismiss(options);
    }
  }

  pushMainComponent(options) {
    const newContent = componentFromDiscloseOptions(options);
    if (!newContent) { return; }

    const newComponentStack = Object.assign([], this.state.main.componentStack);

    const appDelegate = new AppDelegate({
      disclose: this.mainDisclose,
      dismiss: this.popMainComponent,
      closeDisclosure: undefined,
      goBack: this.popMainComponent,
    });

    newComponentStack.push(React.cloneElement(newContent, { app: appDelegate }));

    this.closeSlidePanel();

    this.setState({
      main: {
        componentStack: newComponentStack,
      },
    });
  }

  popMainComponent() {
    if (this.state.main.componentStack.length <= 1) {
      return;
    }

    const newComponentStack = Object.assign([], this.state.main.componentStack);
    newComponentStack.pop();

    this.closeSlidePanel();

    this.setState({
      main: {
        componentStack: newComponentStack,
      },
    });
  }

  panelDisclose(options) {
    if (options.preferredType === 'panel' || options.preferredType === 'main') {
      this.pushSlidePanelComponent(options);
    } else if (this.props.app) {
      this.props.app.disclose(options);
    } else {
      this.pushSlidePanelComponent(options);
    }
  }

  openSlidePanel(options) {
    const newContent = componentFromDiscloseOptions(options);
    if (!newContent) { return; }

    const appDelegate = new AppDelegate({
      disclose: this.panelDisclose,
      dismiss: this.closeSlidePanel,
      closeDisclosure: this.closeSlidePanel,
      maximize: this.maximizeSlidePanel,
    });

    this.setState({
      slidePanel: {
        isOpen: true,
        behavior: options.panelBehavior || 'squish',
        size: options.size || 'small',
        componentStack: [React.cloneElement(newContent, { app: appDelegate })],
      },
    });
  }

  closeSlidePanel() {
    if (!this.state.slidePanel.isOpen) {
      return;
    }

    this.setState({
      slidePanel: {
        isOpen: false,
        behavior: 'squish',
        size: 'small',
        componentStack: [],
      },
    });
  }

  pushSlidePanelComponent(options) {
    const newContent = componentFromDiscloseOptions(options);
    if (!newContent) { return; }

    const newComponentStack = Object.assign([], this.state.slidePanel.componentStack);

    const appDelegate = new AppDelegate({
      disclose: this.panelDisclose,
      dismiss: this.popSlidePanelComponent,
      closeDisclosure: this.closeSlidePanel,
      goBack: this.popSlidePanelComponent,
      maximize: this.maximizeSlidePanel,
    });

    newComponentStack.push(React.cloneElement(newContent, { app: appDelegate }));

    this.setState({
      slidePanel: Object.assign({}, this.state.slidePanel, { componentStack: newComponentStack }),
    });
  }

  popSlidePanelComponent() {
    if (this.state.slidePanel.componentStack.length > 1) {
      const newComponentStack = Object.assign([], this.state.slidePanel.componentStack);

      newComponentStack.pop();

      this.setState({
        slidePanel: Object.assign({}, this.state.slidePanel, { componentStack: newComponentStack }),
      });
    }
  }

  render() {
    return (
      <SlidePanel
        className="orion-SlidePanelLayout"
        mainContent={
          <NavStack animationIsDisabled>
            {this.state.main.componentStack}
          </NavStack>
        }
        panelContent={
          <NavStack>
            {this.state.slidePanel.componentStack}
          </NavStack>
        }
        isOpen={this.state.slidePanel.isOpen}
        panelBehavior={this.state.slidePanel.behavior}
        panelSize={this.state.slidePanel.size}
        panelPosition="end"
        isFullscreen={this.state.slidePanel.isFullscreen}
        fill
      />
    );
  }
}

SlidePanelLayout.propTypes = {
  children: PropTypes.node,
  app: PropTypes.instanceOf(AppDelegate),
};

export default SlidePanelLayout;
