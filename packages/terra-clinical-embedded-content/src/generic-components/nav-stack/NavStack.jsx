import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import NavStackContainer from '../nav-stack-container/NavStackContainer';

const propTypes = {
  animationIsDisabled: PropTypes.bool,
  items: PropTypes.array,
};

const NavStack = (props) => {
  // We don't want to render the transition group when no children exist. Doing so will cause the first child to
  // animate into place, which in most cases we do not want.
  if (!props.items || !props.items.length) {
    return null;
  }

  // We use the key from the first child as the key for the transition group. This will cause the transition group to
  // rerender when root child changes and subsequently prevent that child from animating into position.
  const transitionGroupKey = props.items[0].key;

  const itemCount = props.items.length;

  return (
    <ReactCSSTransitionGroup
      key={transitionGroupKey}
      transitionEnter={!props.animationIsDisabled}
      transitionLeave={!props.animationIsDisabled}
      transitionName="stack-nav"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {props.items.map((item, index) => (
        <NavStackContainer key={item.key} isHidden={index !== itemCount - 1}>
          {item}
        </NavStackContainer>
      ))}
    </ReactCSSTransitionGroup>
  );
};

NavStack.propTypes = propTypes;

export default NavStack;
