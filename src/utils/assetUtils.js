// We can use "process.env.VAR_NAME" on both the server and the client.
// See config/env.js and server/indexHtml.js
import { api } from '../api';
import urlLib from 'url';
import { isArray } from 'util';
export function imagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/${assetName}`;
}

export const isServer = !(typeof window !== 'undefined');

export const filterLaunchesDataForPerformance = launches => {
  if (isServer) {
    console.warn('Data has been filtered for performance reasons');
    launches.forEach(launch => {
      if (typeof launch === 'object') {
        delete launch.details;
        delete launch.launch_failure_details;
        delete launch.launch_site;
        delete launch.rocket;
      }
    });
  }
};

export const filterURLGenerator = (search, limit) => {
  let reqURL = 'https://api.spaceXdata.com/v3/launches';
  reqURL = new URL(reqURL);
  let searchParams = new URLSearchParams(search);
  searchParams.set('limit', limit);
  reqURL.search = searchParams.toString();
  return reqURL.href;
};

export const fetchDataLaunchesData = req => {
  let search = '';
  let userAgent = '';
  let limit = 100;
  if (isServer) {
    // For performance reasons, less data is sent from server
    limit = 8;
    search = urlLib.parse(req.url, true).search;
    userAgent = req.headers['user-agent'];
    // Load 4 cards for mobile
    if (userAgent.includes('Mobile ')) {
      limit = 2;
    }
  } else {
    userAgent = navigator.userAgent;
    search = window.location.search;
  }

  return api.get(filterURLGenerator(search, limit)).then(launches => {
    if (isArray(launches)) {
      filterLaunchesDataForPerformance(launches);
    }
    return {
      launches
    };
  });
};
