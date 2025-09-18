import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './Card.module.scss';

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = clsx(styles.cardHeader, className);

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
