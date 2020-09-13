import React, { useState, useEffect, useRef } from 'react';
import ToggleComponent from '../toggleComponent/ToggleComponent';
import { fetchDataLaunchesDataWithParams } from '../../../utils/assetUtils';
import Button from '../button/Button';
import './filterComponent.scss';

const FilterComponent = props => {
  const currentYear = new Date().getFullYear();
  const [launchYear, setLaunchYear] = useState(2006);
  const [successfulLaunch, setSuccessfulLaunch] = useState(false);
  const [successfulLanding, setSuccessfulLanding] = useState(false);

  const hasMount = useRef(false);

  const years = [];
  for (let year = 2006; year <= currentYear; year++) {
    years.push(year);
  }

  const toggleSuccessfulLaunch = flag => {
    setSuccessfulLaunch(flag);
  };

  const toggleSuccessfulLanding = flag => {
    setSuccessfulLanding(flag);
  };

  useEffect(() => {
    if (hasMount.current) {
      fetchDataLaunchesDataWithParams({
        launch_success: successfulLaunch,
        land_success: successfulLanding,
        launch_year: launchYear
      }).then(data => {
        props.setLaunches(data.launches);
      });
    } else {
      hasMount.current = true;
    }
  }, [successfulLaunch, successfulLanding, launchYear]);

  return (
    <div className="filterWrapper">
      <h2>Filters</h2>
      <div className="launchYear">
        <h3>Launch year</h3>
        <div className="launchesYearWrapper">
          {years.map(year => (
            <Button
              key={year}
              clickHandler={() => {
                setLaunchYear(year);
              }}
              active={launchYear === year ? 'active' : ''}
              buttonText={year}
            />
          ))}
        </div>
      </div>
      <div className="successfulLaunch">
        <ToggleComponent
          flag={successfulLaunch}
          title="Successful Launch"
          clickHandler={toggleSuccessfulLaunch}
        />
      </div>
      <div className="successfulLanding">
        <ToggleComponent
          flag={successfulLanding}
          title="Successful Landing"
          clickHandler={toggleSuccessfulLanding}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
