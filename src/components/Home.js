import React, { Component } from "react";
import Loading from './loading';
import { fetchWeather } from '../redux/actions/weatherActions';
import { connect } from 'react-redux';
import publicIP from 'react-native-public-ip';
import DatePicker from './datePicker'
import renderForecastImage from './WeatherIcon';
import Forecast from './forecast';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Container
} from "react-native";
import dateFormat from 'dateformat';
const today = dateFormat(new Date(), 'ddd d mmmm');
class Home extends Component {
  state = {
    loading: false,
    temperature: '',
    currentSummary: '',
    formattedTime: '',
    city: '',
    humidity: '',
    windSpeed: '',
    cloudCover: '',
    icon: '',
    ip: ''
  }
  componentDidMount() {
    const { fetchWeather } = this.props;
    publicIP()
      .then(ip => {
        this.setState({ ip })
        const query = `ip=${ip}`;
        fetchWeather(query)
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.weatherStatus && prevProps.weatherStatus !== this.props.weatherStatus) {
      console.log('====prev==', prevProps.weatherStatus)
      console.log('====curr==', this.props.weatherStatus)

      const { ip } = this.state;
      const { fetchWeather } = this.props;
      if (ip) {
        const query = `ip=${ip}`;
        fetchWeather(query)
      }

    }

  }


  render() {
    const { weatherStatus, loading } = this.props;
    return (
      ((!weatherStatus || loading) ? <Loading /> :

        <ImageBackground style={styles.backgroundImage} source={require('../assets/header-background.png')}>
          <View>
            <Text style={styles.location}>{weatherStatus.data.city}</Text>
          </View>
          <View style={styles.centerView}>
            <View style={styles.centerImageView}>
              {renderForecastImage(weatherStatus.data.icon, 100, 100)}</View>
            <View>
              <Text style={styles.currentTemp}>{weatherStatus.data.temperature + '\u00B0'}</Text>
              <Text style={styles.summary}>{weatherStatus.data.currentSummary}</Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            <View style={styles.bottomViewLeft}>
              <Text style={styles.bottomViewToday}>
                Today
              </Text>
              <Text style={styles.bottomViewTodayDate}>{today}</Text>
            </View>
            <View style={styles.bottomViewRight}>
              <DatePicker />
            </View>
          </View>
          <View>
              <Forecast  forecast={weatherStatus.data.daily.data} />
          </View>

        </ImageBackground>
      )
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerImageView: {
    paddingRight: 0
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  centerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  currentTemp: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '200'
  },
  summary: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500'
  },
  location: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 35,
    color: '#fff'
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 40
  },
  bottomViewLeft: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomViewToday: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 6,
    fontSize: 16
  },
  bottomViewTodayDate: {
    color: '#fff',
    fontSize: 16
  },
  bottomViewRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = (state) => ({
  weatherStatus: state.weather.data,
  loading: state.weather.loading,
});
const mapDispatchToProps = {
  fetchWeather,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);