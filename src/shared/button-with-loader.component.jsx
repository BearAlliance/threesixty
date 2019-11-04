import React from 'react';
import './button-with-loader.component.css';
import classnames from 'classnames';

export const LoaderButton = ({ onClick, text, loading }) => {
  const buttonClass = classnames({
    button: true,
    'is-link': true,
    'is-loading': loading
  });

  return (
    <button className={buttonClass} onClick={onClick} type="submit">
      {text}
    </button>
  );
};
