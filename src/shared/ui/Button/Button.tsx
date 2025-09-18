import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

// TODO: Add variants, sizes, etc.
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = clsx(styles.button, className);

    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
