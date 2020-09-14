// We can use "process.env.VAR_NAME" on both the server and the client.
// See config/env.js and server/indexHtml.js
import { api } from '../api';
export function imagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/${assetName}`;
}

export const isServer = !(typeof window !== 'undefined');

export const filterURLGenerator = (params = {}) => {
  let reqURL = 'https://api.spaceXdata.com/v3/launches';
  if (!('limit' in params)) {
    if (isServer) {
      params.limit = 10;
    } else {
      params.limit = 100;
    }
  }
  reqURL = new URL(reqURL);
  reqURL.search = new URLSearchParams(params).toString();

  return reqURL.href;
};

export const fetchDataLaunchesData = () => {
  return api.get(filterURLGenerator()).then(launches => {
    return {
      launches
    };
  });
};

export const fetchDataLaunchesDataWithParams = params => {
  return api.get(filterURLGenerator(params)).then(launches => {
    return {
      launches
    };
  });
};
