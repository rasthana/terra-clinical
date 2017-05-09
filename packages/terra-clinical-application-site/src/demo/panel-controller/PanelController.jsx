import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppDelegate from 'terra-clinical-app-delegate';
import PanelPresenter from './PanelPresenter';

import panelControllerReducers from './reducers/panelController';
import { disclose, dismiss, push, pop, toggleMaximize } from './actions/panelController';

class PanelController extends React.Component {
  constructor(props) {
    super(props);

    this.dataForPanelState = this.dataForPanelState.bind(this);
  }

  dataForPanelState() {
    const panelState = this.props.panelState;

    if (!panelState.isOpen) {
      return {
        isOpen: false,
        components: undefined,
      };
    }

    const components = panelState.componentKeys.map((componentKey, index) => {
      const componentData = panelState.components[componentKey];

      const ComponentClass = AppDelegate.getComponent(componentData.name);

      if (!ComponentClass) {
        return undefined;
      }

      const appDelegate = AppDelegate.create({
        disclose: (data) => {
          if (data.preferredType === 'panel' || !this.props.app) {
            this.props.pushPanel(data);
          } else {
            this.props.app.disclose(data);
          }
        },
        dismiss: (index > 0 ?
          () => {
            this.props.popPanel();
          } :
          () => {
            this.props.dismissPanel();
          }
        ),
        closeDisclosure: () => { this.props.dismissPanel(); },
        maximize: () => { this.props.toggleMaximizePanel(); },
        canGoBack: index > 0,
        isMaximized: panelState.isMaximized,
        disclosedAs: 'panel',
        availableDisclosureTypes: Object.assign([], this.props.app.availableDisclosureTypes, ['panel']),
      });

      return <ComponentClass key={componentKey} {...componentData.props} app={appDelegate} />;
    });

    return {
      isOpen: true,
      isMaximized: panelState.isMaximized,
      componentStack: components,
      size: panelState.size,
    };
  }

  render() {
    const { app, panelState, disclosePanel, dismissPanel, pushPanel, popPanel, toggleMaximizePanel, children } = this.props;

    return (
      <PanelPresenter panelState={this.dataForPanelState()}>
        {React.Children.map(children, (child) => {
          const childAppDelegate = AppDelegate.create({
            disclose: (data) => {
              if (data.preferredType === 'panel' || !app) {
                disclosePanel(data);
              } else {
                app.disclose(data);
              }
            },
            dismiss: app && app.dismiss,
            closeDisclosure: app && app.closeDisclosure,
            maximize: app && app.maximize,
            isMaximized: app && app.isMaximized,
            canGoBack: app && app.canGoBack,
            disclosedAs: app && app.disclosedAs,
            availableDisclosureTypes: Object.assign([], app && app.availableDisclosureTypes, ['panel']),
          });

          return React.cloneElement(child, { app: childAppDelegate });
        })}
      </PanelPresenter>
    );
  }
}

PanelController.propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node,
  panelState: PropTypes.object,
  disclosePanel: PropTypes.func,
  dismissPanel: PropTypes.func,
  pushPanel: PropTypes.func,
  popPanel: PropTypes.func,
  toggleMaximizePanel: PropTypes.func,
};

const mapStateToProps = state => ({ panelState: state.panelController });

const mapDispatchToProps = dispatch => (
  {
    disclosePanel: (data) => { dispatch(disclose(data)); },
    dismissPanel: (data) => { dispatch(dismiss(data)); },
    pushPanel: (data) => { dispatch(push(data)); },
    popPanel: (data) => { dispatch(pop(data)); },
    toggleMaximizePanel: (data) => { dispatch(toggleMaximize(data)); },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PanelController);

const reducers = {
  panelController: panelControllerReducers,
};

export { reducers };
