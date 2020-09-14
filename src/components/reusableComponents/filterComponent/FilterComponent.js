import React, { useState, useEffect, useRef } from 'react';
import ToggleComponent from '../toggleComponent/ToggleComponent';
import { isServer, fetchDataLaunchesData } from '../../../utils/assetUtils';
import Button from '../button/Button';
import './filterComponent.scss';

const FilterComponent = props => {
  const { search, push } = props;
  const currentYear = new Date().getFullYear();
  const searchParams = new URLSearchParams(search);
  const [launchYear, setLaunchYear] = useState(
    Number(searchParams.get('launch_year'))
  );
  const [successfulLaunch, setSuccessfulLaunch] = useState(
    searchParams.get('launch_success')
  );
  const [successfulLanding, setSuccessfulLanding] = useState(
    searchParams.get('land_success')
  );

  const years = [];
  for (let year = 2006; year <= currentYear; year++) {
    years.push(year);
  }

  const toggleSuccessfulLaunch = flag => {
    updateSearchParams('launch_success', flag, push);
  };

  const toggleSuccessfulLanding = flag => {
    updateSearchParams('land_success', flag, push);
  };

  const updateLaunchYear = year => {
    updateSearchParams('launch_year', year, push);
  };

  useEffect(() => {
    if (!isServer) {
      fetchDataLaunchesData().then(data => {
        props.setLaunches(data.launches);
      });
    }
    const searchParams = new URLSearchParams(search);
    setLaunchYear(Number(searchParams.get('launch_year')));
    setSuccessfulLanding(searchParams.get('land_success'));
    setSuccessfulLaunch(searchParams.get('launch_success'));
  }, [search]);

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
                updateLaunchYear(year);
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

export const updateSearchParams = (key, value, push) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  const existingPath = window.location.pathname + window.location.search;
  const newPath = `/?${searchParams.toString()}`;
  if (newPath !== existingPath) {
    push(newPath);
  }
};

export default FilterComponent;
