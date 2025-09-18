import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './FormField.module.scss';

export type FormFieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const FormFieldLabel = forwardRef<HTMLLabelElement, FormFieldLabelProps>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = clsx(styles.formFieldLabel, className);

    return (
      <label ref={ref} className={classNames} {...props}>
        {children}
      </label>
    );
  }
);

FormFieldLabel.displayName = 'FormFieldLabel';

export default FormFieldLabel;
