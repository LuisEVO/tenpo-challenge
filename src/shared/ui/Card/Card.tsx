import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './Card.module.scss';
import CardContent from './CardContent';
import CardHeader from './CardHeader';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

// Define the base Card component
const CardComponent = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = clsx(styles.card, className);

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

CardComponent.displayName = 'Card';

// Create the Card with subcomponents using a more robust approach
const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Content: CardContent,
}) as typeof CardComponent & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
};

export default Card;
