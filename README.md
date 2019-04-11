This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn about the POST-RPC library, check out [the repo](https://github.com/Wizehive/post-rpc).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Developing with AnglerFish

1. `npm start` serves on port 3000. Point some sort of https tunnel (like ngrok) towards this port.
2. Use the url from this tunnel as the `origin` in the Post-rpc server instantiation for this plugin in Anglerfish.
3. Use the top-level domain (and any subdomains) of the url that is serving your Anglerfish app as the `origin` for your Post-rpc client instantiation.
4. The iframe should now be displaying your React plugin, and any refreshes your React app triggers will automatically reload the project within the iframe (though you can also refresh the browser and reload everything, too).
