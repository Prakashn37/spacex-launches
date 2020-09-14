import React from 'react';
import './card.scss';

const Card = props => {
  const { mission_name, launch_year, links, mission_id } = props;
  return (
    <React.Fragment>
      <div className="card">
        {/* <img src={links.mission_patch_small} alt="Avatar" /> */}
        <img src={links.mission_patch_small} alt={mission_name} />
        <div className="container">
          <div className="missionName">{mission_name}</div>
          <div className="launchYear">
            Mission ids:
            <ul>
              {mission_id.length
                ? mission_id.map(id => <li key={id}>{id}</li>)
                : null}
            </ul>
          </div>
          <div className="launchYear">
            Launch year:
            <span>{launch_year}</span>
          </div>
          <div className="successfulLaunch">
            Successful Launch:
            <span>{launch_year}</span>
          </div>
          <div className="successfulLanding">
            Successful Landing:
            <span>{launch_year}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
