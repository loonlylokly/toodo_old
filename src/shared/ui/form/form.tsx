/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { FC, FormHTMLAttributes, MutableRefObject } from 'react';

type Props = {
  formRef?: MutableRefObject<HTMLFormElement> | undefined;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form: FC<Props> = ({ formRef = null, children, ...props }) => {
  return (
    <form ref={formRef} {...props}>
      {children}
    </form>
  );
};
