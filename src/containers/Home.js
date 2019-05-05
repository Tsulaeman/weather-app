import React from 'react';

import { Row, Spin } from 'antd';

import { getLocations } from '../helpers/weather-helper';
import { Weather } from '../components/weather';
import SearchBar from '../components/search';
// a list of all the default cities at the home page
const cities = [
  'Istanbul', 'Berlin', 'London',
  'Helsinki', 'Dublin', 'Vancouver',
];

class Home extends React.Component{
  state = {
    woeids: [],
    theWeathers: [],
    loading: true,
  };

  componentDidMount = () => {
    this.weatherBox();
  }

  onSearch = (value) => {
    this.props.history.push('/search/'+value);
  }

  weatherBox = async () => {
    let weathers = [];
    let theError = '';
    try{
     weathers = await getLocations(cities);
    }catch(error){
      theError = error;
    }
    const theWeathers = <Weather {...this.props} error={theError} data={weathers}  />;
    this.setState({ theWeathers, loading: false });
  }
  
  render = () => {
    const { theWeathers, loading } = this.state;
    return (
      <Row className="App">
        <SearchBar {...this.props} onSearch={this.onSearch} />
        <Row>
        <Spin size="large" tip="The Weather Man is coming..." spinning={loading}>
          {theWeathers}
        </Spin>
        </Row>
      </Row>
    );
  }
}

export default Home;