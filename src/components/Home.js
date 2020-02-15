import React, { Component } from "react";
import { Loading } from './loading';
import { fetchWeather }  from '../redux/actions/weatherActions';
import { connect } from 'react-redux';
import publicIP from 'react-native-public-ip';
 
import {renderForecastImage} from './WeatherIcon';
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Home extends Component {
  static navigationOptions = { header: null };
  state = {
    loading: false,
    temperature:'',
    currentSummary:'',
    formattedTime:'',
    city:'',
    humidity:'',
    windSpeed:'',
    cloudCover:'',
    icon:'',
    ip:''
  }
  componentDidMount() {
  
    publicIP()
      .then(ip => {
        this.setState({ip})
      })
      .catch(error => {
        console.log(error);
      });
    }

  componentDidUpdate()  {
    console.log('came here')
    const { ip } = this.state;
    const { fetchWeather } = this.props;
  
    if (ip) {
      const query = `ip=${ip}`;
      fetchWeather(query)
    }
  }
  renderBackground() {
    return (
      <Image source={require('../assets/header-background.png')}/>
    );
  }
  
  render() {
    const { weatherStatus, loading } = this.props;
    return (
      this.renderBackground()
      (loading?(<Loading/>):(<View style={styles.centerImageView}>
          { renderForecastImage(weatherStatus.icon, 100, 100) }</View>))
    )
  
    
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6f9ff'
    },
    centerImageView: {
      paddingRight: 20
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