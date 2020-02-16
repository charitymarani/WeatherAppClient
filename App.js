/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import store from './src/redux';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import ConnectedCountries from './src/components/Home';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <ConnectedCountries />
        </Root>
      </Provider>
    );
  }
}