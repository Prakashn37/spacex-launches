# React Server Side Rendering Boilerplate ⚛️

## Running at

https://prakash-spacex-launches.herokuapp.com/

## Initial setup

- `npm install`

## Development

- `npm start`
  - Start the dev server at [http://localhost:3000](http://localhost:3000)
- `npm test`
  - Start `jest` in watch mode

## Production

- `npm run build && npm run start:prod`
  - Bundle the JS and fire up the Express server for production
- `npm run docker`
  - Build and start a local Docker image in production mode (mostly useful for debugging)
  
  ## Performace
  
  Limit in the API call (Server side alone) has been limited (To decrease HTML size, by loading only visible content)
  
  Link to Lighthouse report
  
  Note: Performance may vary due to limited nature of hosting service.
  
  https://drive.google.com/drive/folders/17JkUCjUNripUmps0siQ3yDJTgBz8lQ4E
  
  Mobile
  
  ![alt text](https://github.com/Prakashn37/spacex-launches/blob/master/public/Lighthouse%20Mobile.jpg)
  
  Desktop
  
  ![alt text](https://github.com/Prakashn37/spacex-launches/blob/master/public/Lighthouse%20Desktop.jpg)
