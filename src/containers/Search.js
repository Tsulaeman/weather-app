import React from 'react';

import { getLocations } from '../helpers/weather-helper';
import { Weather } from '../components/weather';
import SearchBar from '../components/search';
import { Row, Spin } from 'antd';

class Search extends React.Component{
  state = {
    results: [],
    error: '',
    loading: false,
    search: '',
  }

  componentDidMount = () => {
    const search = this.props.match.params.keyword;
    this.setState({ search });
    this.getResults(search);
  }

  getResults = async (search) => {
    this.props.history.push(`/search/${search}`);
    try{
      this.setState({ loading: true});
      const response = await getLocations([search]);
      this.setState({ results: response });
      // console.log('Search Results', response);
    }catch(error){
      this.setState({ error, results: [] });
    }
    this.setState({ loading: false});
  }

  render = () => {
    const {
      results, error, loading, 
    } = this.state;
    return (
      <Row>
        <SearchBar {...this.props} onSearch={this.getResults} />
        <Spin size="large" spinning={loading} tip="The Weather is on it's way...">
          <Weather {...this.props} error={error} data={results} />
        </Spin>
      </Row>
    )
  }
}

export default Search;