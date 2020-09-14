// We can use "process.env.VAR_NAME" on both the server and the client.
// See config/env.js and server/indexHtml.js
import { api } from '../api';
import urlLib from 'url';
export function imagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/${assetName}`;
}

export const isServer = !(typeof window !== 'undefined');

export const filterURLGenerator = search => {
  let reqURL = 'https://api.spaceXdata.com/v3/launches';
  reqURL = new URL(reqURL);
  let searchParams = new URLSearchParams(search);
  searchParams.limit = isServer ? 10 : 100; // For performance reasons, less data is sent from server
  reqURL.search = searchParams.toString();
  return reqURL.href;
};

export const fetchDataLaunchesData = req => {
  let search = '';
  if (isServer) {
    search = urlLib.parse(req.url, true).search;
  } else {
    search = window.location.search;
  }
  return api.get(filterURLGenerator(search)).then(launches => {
    return {
      launches
    };
  });
};
