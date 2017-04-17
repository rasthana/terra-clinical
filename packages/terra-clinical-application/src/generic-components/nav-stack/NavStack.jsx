import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import NavStackContainer from '../nav-stack-container/NavStackContainer';

const propTypes = {
  animationIsDisabled: PropTypes.bool,
  children: PropTypes.node,
};

const NavStack = (props) => {
  // We don't want to render the transition group when no children exist. Doing so will cause the first child to
  // animate into place, which in most cases we do not want.
  if (!React.Children.count(props.children)) {
    return null;
  }

  // We use the key from the first child as the key for the transition group. This will cause the transition group to
  // rerender when root child changes and subsequently prevent that child from animating into position.
  const transitionGroupKey = React.Children.toArray(props.children)[0].key;

  const childCount = React.Children.count(props.children);

  return (
    <ReactCSSTransitionGroup
      key={transitionGroupKey}
      transitionEnter={!props.animationIsDisabled}
      transitionLeave={!props.animationIsDisabled}
      transitionName="stack-nav"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {React.Children.map(props.children, (child, index) => (
        <NavStackContainer key={child.key} isHidden={index !== childCount - 1}>
          {child}
        </NavStackContainer>
      ))}
    </ReactCSSTransitionGroup>
  );
};

NavStack.propTypes = propTypes;

export default NavStack;
