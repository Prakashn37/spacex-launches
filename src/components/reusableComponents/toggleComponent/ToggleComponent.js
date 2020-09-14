import React from 'react';
import Button from '../button/Button';

import './toggleComponent.scss';

const ToggleComponent = props => {
  const { flag, clickHandler, title } = props;
  return (
    <div className="toggleComponent">
      <h3>{title}</h3>
      <div className="buttonWrap">
        <Button
          clickHandler={() => {
            clickHandler(true);
          }}
          active={/true/.test(flag)}
          buttonText="True"
        />
        <Button
          clickHandler={() => {
            clickHandler(false);
          }}
          active={/false/.test(flag)}
          buttonText="False"
        />
      </div>
    </div>
  );
};

export default ToggleComponent;
