import React, { useState } from 'react';

import { useServerData } from '../../state/serverDataContext';
import FilterComponent from '../reusableComponents/filterComponent/FilterComponent';
import Card from '../reusableComponents/card/Card';
import Head from '../Head';
import { fetchDataLaunchesData } from '../../utils/assetUtils';
import './page.scss';

const Home = props => {
  const [launches, setLaunches] = useState(
    useServerData(data => {
      return data.launches || [];
    })
  );
  const [loading, setLoading] = useState(false);
  return (
    <React.Fragment>
      <h1>SpaceX Launch Programs</h1>
      <div className="pageContainer">
        <Head />
        <FilterComponent
          search={props.history.location.search}
          push={props.history.push}
          setLaunches={setLaunches}
          setLoading={setLoading}
        />
        <div className="cardsWrapper">
          {!loading && launches.length
            ? launches.map(launch => (
                <Card key={launch.flight_number} {...launch} />
              ))
            : null}
          {loading ? <h2>Loading ...</h2> : null}
          {!loading && !launches.length ? <h2>No Missions</h2> : null}
        </div>
      </div>
    </React.Fragment>
  );
};

Home.fetchData = fetchDataLaunchesData;

export default Home;
