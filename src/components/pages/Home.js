import React, { useState } from 'react';

import { useServerData } from '../../state/serverDataContext';
import FilterComponent from '../reusableComponents/filterComponent/FilterComponent';
import Card from '../reusableComponents/card/Card';
import Head from '../Head';
import { fetchDataLaunchesData } from '../../utils/assetUtils';
import './page.scss';

const Home = () => {
  const [launches, setLaunches] = useState(
    useServerData(data => {
      return data.launches || [];
    })
  );
  return (
    <React.Fragment>
      <h1>SpaceX Launch Programs</h1>
      <div className="pageContainer">
        <Head />
        <FilterComponent setLaunches={setLaunches} />
        <div className="cardsWrapper">
          {launches.map(launch => (
            <Card key={launch.flight_number} {...launch} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

Home.fetchData = fetchDataLaunchesData;

export default Home;
