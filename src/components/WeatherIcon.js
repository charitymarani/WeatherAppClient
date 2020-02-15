
import React, { Component } from 'react';
import { Image } from 'react-native';
function renderForecastImage(icon, width, height) {
  let  image;
  switch (icon) {
    case 'clear-night':
    case 'clear-day':
      image = require('../assets/sunny_s_cloudy.png');
      break;
    case 'sleet':
      image = require('../assets/rain_light.png');
      break;

    case 'partly-cloudy-night':
    case 'partly-cloudy-day':
      image = require('../assets/partly_cloudy.png');
      break;
    case 'cloudy':
      image = require('../assets/cloudy.png');
      break;
    case 'rain':
      image = require('../assets/rain_s_cloudy.png');
      break;
    case 'snow':
      image = require('../assets/snow.png');
      break;
    case 'fog':
      image = require('../assets/fog.png');
      break;
    default:
      image = require('../assets/sunny_s_cloudy.png');
  }

  const imageStyle = {
    width: width,
    height: height
  };

  return (
    <Image style={imageStyle} source={image} />
  );
}

export default renderForecastImage;