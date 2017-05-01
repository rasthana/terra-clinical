import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ComponentRegistry from 'terra-clinical-application/src/navigation/core/registry/ComponentRegistry';
import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import { dismissPanel, pushPanel, popPanel, maximizePanel } from './actions/shared/panelManager';

const panelDisclosureController = stateKey => (
  (WrappedComponent) => {
    class PanelDisclosureController extends React.Component {
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

          const ComponentClass = ComponentRegistry[componentData.name];

          if (!ComponentClass) {
            return undefined;
          }

          const appDelegate = AppDelegate.create({
            disclose: (data) => {
              debugger;
              if (data.preferredType === 'modal') {
                this.props.discloseModal({
                  content: {
                    key: data.content.key,
                    name: data.content.name,
                    props: data.content.props,
                  },
                  size: data.size,
                });
              } else {
                this.props.pushPanel({
                  content: {
                    key: data.content.key,
                    name: data.content.name,
                    props: data.content.props,
                  },
                });
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
            maximize: () => { this.props.maximizePanel(); },
            canGoBack: index > 0,
            isMaximized: panelState.isMaximized,
          });

          // TODO: Validate key approach
          // It'd be nice if we could use the componentKey as the actual key, as it would most likely mirror that of
          // one that would be given through props anyway. With this setup, a separate key set in props would take
          // precedent, if present.
          return <ComponentClass key={componentKey} {...componentData.props} app={appDelegate} />;
        });

        return {
          isOpen: panelState.isOpen,
          isMaximized: panelState.isMaximized,
          behavior: panelState.behavior,
          size: panelState.size,
          componentStack: components,
        };
      }

      render() {
        return <WrappedComponent {...this.props} panelState={this.dataForPanelState()} />;
      }
    }

    PanelDisclosureController.propTypes = {
      panelState: PropTypes.object,
      dismissPanel: PropTypes.func,
      pushPanel: PropTypes.func,
      popPanel: PropTypes.func,
      maximizePanel: PropTypes.func,
    };

    PanelDisclosureController.displayName = (() => (
      `PanelDisclosureController(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    ))();

    const mapStateToProps = state => (
      {
        panelState: state[stateKey],
      }
    );

    const mapDispatchToProps = dispatch => (
      {
        dismissPanel: (data) => { dispatch(dismissPanel(data)); },
        pushPanel: (data) => { dispatch(pushPanel(data)); },
        popPanel: (data) => { dispatch(popPanel(data)); },
        maximizePanel: (data) => { dispatch(maximizePanel(data)); },
      }
    );

    return connect(mapStateToProps, mapDispatchToProps)(PanelDisclosureController);
  }
);

export default panelDisclosureController;
