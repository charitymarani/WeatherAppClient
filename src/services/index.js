export const resolveBaseUrl = () => { //eslint-disable-line
  const testUrl = 'http://10.0.2.2:3001/location';
  const env = process.env.NODE_ENV;
  const baseUrl = ['test', 'development'].includes(env)
    ? testUrl
    : process.env.REACT_APP_API_URL;

  return baseUrl;
};