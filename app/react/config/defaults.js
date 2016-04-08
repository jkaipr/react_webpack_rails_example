const apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var
const apiUrl = `http://localhost:${apiPort}`; // eslint-disable-line no-var

module.exports = {
  appName: 'React Webpack Rails App',
  apiUrl: `${apiUrl}/api/v1`
};
