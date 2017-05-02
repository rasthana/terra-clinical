import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';
import { appDelegateKey as EmbeddedContentKey } from 'terra-clinical-application/src/patient-app/embedded-content-consumer/EmbeddedContentConsumer';

import { dismiss, push, pop, toggleMaximize } from './actions/shared/panel';

const panelDisclosureController = stateKeys => (
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

          const ComponentClass = AppDelegate.getComponent(componentData.name);

          if (!ComponentClass) {
            return undefined;
          }

          const appDelegate = AppDelegate.create({
            disclose: (data) => {
              if (data.preferredType !== 'panel' && this.props.app) {
                this.props.app.disclose(data);
                return;
              }

              let contentStruct;
              if (data.content.fallbackUrl) {
                contentStruct = {
                  content: {
                    key: data.content.key,
                    name: EmbeddedContentKey,
                    props: {
                      src: data.content.fallbackUrl,
                    },
                  },
                };
              } else {
                contentStruct = {
                  content: {
                    key: data.content.key,
                    name: data.content.name,
                    props: data.content.props,
                  },
                };
              }

              this.props.pushPanel(Object.assign({}, contentStruct, {
                size: data.size,
              }));
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
      app: AppDelegate.propType,
      panelState: PropTypes.object,
      dismissPanel: PropTypes.func,
      pushPanel: PropTypes.func,
      popPanel: PropTypes.func,
      maximizePanel: PropTypes.func,
    };

    PanelDisclosureController.displayName = (() => (
      `PanelDisclosureController(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    ))();

    const mapStateToProps = (state) => {
      let panelState = state;
      stateKeys.forEach((key) => {
        panelState = panelState[key];
      });

      return { panelState };
    };

    const mapDispatchToProps = dispatch => (
      {
        dismissPanel: (data) => { dispatch(dismiss(data)); },
        pushPanel: (data) => { dispatch(push(data)); },
        popPanel: (data) => { dispatch(pop(data)); },
        maximizePanel: (data) => { dispatch(toggleMaximize(data)); },
      }
    );

    return connect(mapStateToProps, mapDispatchToProps)(PanelDisclosureController);
  }
);

export default panelDisclosureController;
