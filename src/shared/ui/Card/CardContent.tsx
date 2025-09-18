import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './Card.module.scss';

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = clsx(styles.cardContent, className);

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export default CardContent;
