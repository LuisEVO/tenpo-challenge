import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

// TODO: Add sizes
export type InputState = 'default' | 'error'; // TODO: Add more states

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  state?: InputState;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', state = 'default', ...props }, ref) => {
    const classNames = clsx(styles.input, styles[`input--${state}`], className);

    return <input ref={ref} className={classNames} {...props} />;
  }
);

Input.displayName = 'Input';

export default Input;
