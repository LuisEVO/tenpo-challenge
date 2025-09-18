import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './FormField.module.scss';

export type FormFieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  error?: string;
};

const FormFieldError = forwardRef<HTMLParagraphElement, FormFieldErrorProps>(
  ({ className = '', error, ...props }, ref) => {
    const classNames = clsx(styles.formFieldError, className);

    return (
      <p ref={ref} className={classNames} {...props}>
        {error}
      </p>
    );
  }
);

FormFieldError.displayName = 'FormFieldError';

export default FormFieldError;
