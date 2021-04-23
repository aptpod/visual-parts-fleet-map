declare module 'react-storybook-addon-props-combinations' {
  import React from 'react';
  import { ComponentProps } from 'react';

  export function setDefaults(_: any): any;

  /* declare */ type PropsPatterns<S> = {
    [P in keyof S]: S[P][];
  };

  export default function <T extends React.FC<any>>(Component: T, propsPatterns: PropsPatterns<ComponentProps<T>>): any;
}
