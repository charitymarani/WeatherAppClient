/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import renderForecastImage from './WeatherIcon';

// type Props = {
//   index: number;
//   day: string;
//   icon: string;
//   low: string;
//   high: string;
//   separator: any;
// };

class ForecastItem extends Component {
  getdate = (time) =>{
    let day = (Math.floor(time / 86400) + 4)% 7
    switch(day){
      case 0 :
        return 'Sunday'
      case 1 :
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4 :
        return 'Thursday'
      case 5 :
        return 'Friday'
      case 6 :
        return 'Saturday'
      default :
        return 'Default'
    }

  }
  
  render() {
    var day = this.props.index === 1 ? 'Tomorrow' : this.getdate(this.props.time)
      ;
    return (
      <View style={[styles.forecastItem, this.props.separator]}>
        <View stye={styles.forecastItemDayView}>
          <Text style={styles.dayText}>{ day }</Text>
        </View>
        <View style={styles.forecastItemDataView}>
          { renderForecastImage(this.props.icon, 22, 22) }
          <Text style={styles.forecastItemTempLow}>{ Math.floor(this.props.temperatureLow) }</Text>
          <Text style={styles.forecastItemTempHigh}>{ Math.floor(this.props.temperatureHigh) }</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  forecastItem: {
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: 'row'
  },
  forecastItemDayView: {
    flex: 1
  },
  forecastItemDataView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dayText: {
    fontSize: 16
  },
  forecastItemTempLow: {
    textAlign: 'right',
    marginLeft: 16,
    width: 20,
    color: '#B0B5BF',
    fontSize: 16
  },
  forecastItemTempHigh: {
    textAlign: 'right',
    marginLeft: 16,
    width: 20,
    fontSize: 16
  }
});

export default ForecastItem;