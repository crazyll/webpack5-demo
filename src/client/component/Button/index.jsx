import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './style/index.less';
import TimeButton from './TimeButton';

/**
 * @param {{
 *  size: 'xs' | 'sm' |'md',
 *  htmlType:'button' | 'submit'| 'reset',
 *  type:'default'| 'defaultnoborder'| 'primary',|'secondary'|'dashed'
 * }} props
 */
function Button({
  children,
  type,
  size,
  htmlType, // 设置 button 原生的 type 值，可选值请参考 HTML 标准
  // loading, // 未实现
  disabled,
  className,
  block,
  ...other
}) {
  const classnames = classNames(styles.btn, className, {
    [styles.xs]: size === 'xs',
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md',

    [styles.default]: type === 'default',
    [styles.defaultnoborder]: type === 'defaultnoborder',
    [styles.primary]: type === 'primary',
    [styles.secondary]: type === 'secondary',
    [styles.dashed]: type === 'dashed',

    [styles.disabled]: disabled,
    [styles.block]: block,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={htmlType} className={classnames} disabled={disabled} {...other}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'defaultnoborder', 'primary', 'secondary', 'dashed']),
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  block: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  htmlType: 'button',
  disabled: false,
  className: '',
  type: 'default',
  size: 'sm',
  block: false,
};

export default Button;
