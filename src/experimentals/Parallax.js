import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { addClass, onEnter } from '../helpers';

/**
 * A hover parallax effect.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
const Parallax = (props) => {
  const { children, title, topLeft, topRight, bottomLeft, bottomRight } = props;

  // add the className prop to the className
  let className = addClass('parallax', props.className);

  // remove unnecessary props
  let myProps = _.omit(props, [
    'children',
    'title',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
  ]);

  return (
    <div {...myProps} className={className}>
      <div
        className="parallax-top-left"
        role="button"
        tabIndex={0}
        onClick={topLeft}
        onKeyPress={onEnter(topLeft)}
      />
      <div
        className="parallax-top-right"
        role="button"
        tabIndex={0}
        onClick={topRight}
        onKeyPress={onEnter(topRight)}
      />
      <div
        className="parallax-bottom-left"
        role="button"
        tabIndex={0}
        onClick={bottomLeft}
        onKeyPress={onEnter(bottomLeft)}
      />
      <div
        className="parallax-bottom-right"
        role="button"
        tabIndex={0}
        onClick={bottomRight}
        onKeyPress={onEnter(bottomRight)}
      />
      <div className="parallax-content">
        <div className="parallax-front">
          <h2>{title}</h2>
        </div>
        <div className="parallax-back">{children}</div>
      </div>
    </div>
  );
};

Parallax.defaultProps = {
  className: '',
  children: undefined,
  title: '',
  topLeft: _.noop,
  topRight: _.noop,
  bottomLeft: _.noop,
  bottomRight: _.noop,
};

Parallax.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node,
  topLeft: PropTypes.func,
  topRight: PropTypes.func,
  bottomLeft: PropTypes.func,
  bottomRight: PropTypes.func,
};

export default Parallax;
