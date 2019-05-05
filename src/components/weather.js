import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { MW_URL } from '../api';

import { Col, Row } from 'antd';

const formatDegree = (deg) => {
  deg = Math.round(deg);
  return (
      <b>{deg}&#8451;</b>
    );
}

export const otherDays = (consolidated_weather) => {
  let otherDays = consolidated_weather.map((days) => {
    const {
      weather_state_abbr, weather_state_name,
      the_temp, max_temp, min_temp, applicable_date,
    } = days;
    const dateFromat = moment(applicable_date).format('dddd');

    return (
      <Col md={{span: 8}} key={days.id}>
        <ul className="meta-box">
          <li className="meta-box-date">
          <img
            width="20px"
            src={`${MW_URL}static/img/weather/${weather_state_abbr}.svg`}
            title={weather_state_name}
            alt={weather_state_name}
          />
            <h2>{dateFromat}</h2>
          </li>
          <li>Temperature: {formatDegree(the_temp)}</li>
          <li>Max. Temp: {formatDegree(max_temp)} Min. Temp {formatDegree(min_temp)}</li>
        </ul>
      </Col>
    );

  });
  otherDays = (
    <Col span={18}>
      <Row>
        {otherDays}
      </Row>
    </Col>
  )
  return otherDays;
}

export const Weather = (props) => {
  const search = props.match.params.keyword || '';
  const data = (props.data || []);
  const error = (data.error || '');
  // Check if the data passed is not empty and does not contain errors 
  if(data.length === 0 || error !== '' || ((data[0] || {}).error || '') !== ''){
    let theError = error === '' ? ((data[0] || {}).error || ''): error;
    if(theError === ''){
      theError = (
        <p>
          <span>No results were found. Try changing the keyword!</span><br/>
          <span>Keyword: <b>{search}</b></span>
        </p>
      );
    }
    return (
      <Col xs={{span: 24}} sm={{span: 12, offset: 6}} lg={{span: 18, offset: 3}}>
        <h1 style={{textAlign: 'center'}}>{theError}</h1>
      </Col>
    )
  }
  const results = data.map((datum) => {
    const consolidatedWeather = datum.consolidated_weather[0];
    const {
      the_temp, max_temp, min_temp,
      weather_state_abbr, weather_state_name,
    } = consolidatedWeather;

    return (
      <Col key={datum.woeid} style={{padding: '20px', textAlign: 'center'}}
        xs={{span: 24}}
        sm={{span: 6}}
        lg={{span: 6}}
        className="weather-container"
      >
        <Link to={`/weather/${datum.woeid}`}>
          <h4 style={{align: 'center'}} className="city-name">{datum.title}</h4>
          <h5 style={{align: 'center'}} className="temperature">{formatDegree(the_temp, 2)}</h5>
          <img
            width="100px"
            src={`${MW_URL}static/img/weather/${weather_state_abbr}.svg`}
            title={weather_state_name}
            alt={weather_state_name}
          />
          <div className="min-max" style={{paddingTop: '10px'}}>
            <span>Min: {formatDegree(min_temp, 2)}</span>&nbsp;
            <span>Max: {formatDegree(max_temp, 2)}</span>
          </div>
        </Link>
      </Col>
    );
  });
  // console.log('The View ', results);
  return results;
}