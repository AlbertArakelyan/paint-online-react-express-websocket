import React from 'react';
import toolState from '../store/toolState';

const SettingBar = () => {
  return (
    <div className="setting-bar">
      <div>
        <label htmlFor="line-width">Line width:</label>
        <input
          id="line-width"
          type="number"
          defaultValue={1}
          min={1}
          max={50}
          onChange={(e) => toolState.setLineWidth(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SettingBar;