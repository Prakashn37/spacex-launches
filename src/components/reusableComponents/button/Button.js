import React from 'react';
import './button.scss';

const Button = props => {
  const { buttonText, clickHandler, active } = props;
  return (
    <div onClick={clickHandler} className={`button ${active ? 'active' : ''}`}>
      {buttonText}
    </div>
  );
};

export default Button;
