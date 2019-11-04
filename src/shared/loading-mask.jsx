import React from 'react';
import { Loading } from './loading.component';

export const LoadingMask = ({ loading, children }) => {
  console.log(loading);
  console.log(children);
  return loading ? <Loading /> : children;
};
