import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styles from './FormField.module.scss';
import FormFieldError from './FormFieldError';
import FormFieldLabel from './FormFieldLabel';

export type FormFieldProps = React.HTMLAttributes<HTMLDivElement>;

// Define the base Card component
const FormFieldComponent = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className = '', children, ...props }, ref) => {
    const classNames = clsx(styles.formField, className);

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

FormFieldComponent.displayName = 'FormField';

// Create the Card with subcomponents using a more robust approach
const FormField = Object.assign(FormFieldComponent, {
  Label: FormFieldLabel,
  Error: FormFieldError,
}) as typeof FormFieldComponent & {
  Label: typeof FormFieldLabel;
  Error: typeof FormFieldError;
};

export default FormField;
