import React from 'react';

import { Row, Spin } from 'antd';

import { getLocation } from '../helpers/weather-helper';
import { Weather, otherDays } from '../components/weather';

class Details extends React.Component{
  state = {
    woeids: [],
    theWeathers: [],
    theOtherDays: [],
    loading: true,
  };

  componentDidMount = () => {
    const { woeid } = this.props.match.params;
    this.weatherBox(woeid);
  }

  weatherBox = async (woeid) => {
    const weather = await getLocation(woeid);
    const { consolidated_weather } = weather;
    const mainWeather = <Weather {...this.props} data={[weather]}  />;
    const theOtherDays = otherDays((consolidated_weather || []));
    const theWeathers = mainWeather;
    this.setState({ theWeathers, theOtherDays, loading: false });
  }
  
  render = () => {
    const { theWeathers, theOtherDays, loading } = this.state;
    return (
      <Row className="App">
        <Spin spinning={loading} tip="Rain! Rain!! Go away! Come again another day.">
          <Row>
            {theWeathers}
            {theOtherDays}
          </Row>
        </Spin>
      </Row>
    );
  }
}

export default Details;