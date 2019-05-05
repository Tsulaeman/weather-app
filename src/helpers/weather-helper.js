import Axios from 'axios';
import { LOCAL_URL } from '../api';

const getCities = (cities) => {
  let response;
  try{
      response = cities.map((city) => {
      return Axios.get(`${LOCAL_URL}`, {params: {command: 'search', keyword: city}});
    });
  }catch(error){
    console.log('Error: ',error);
    return [];
  }

  return Promise.all(response).then((resp) => {
    const woeids = resp.map((weather) => {
      return ((weather.data[0] || {}).woeid || '');
    });
    
    return woeids;

  }).catch((error) => {
    console.log(error.message);
  })
}

export const getLocations = async (cities = []) => {
  const woeids = await getCities(cities);
  let weather = [];
  if(woeids.length < 1){
    return [];
  }
  try{  
      weather = (woeids || []).map((woeid) => {
      if(woeid){
        return Axios.get(`${LOCAL_URL}`,{params: {command: 'location', woeid}});
      }
      return false;
    });
  }catch(error){
    console.log('Error: ',error);
    return [];
  }

  return Promise.all(weather).then((response) => {
    return response.map((resp) => {
      return resp.data;
    })
  }).catch((error) => {
    throw error.message;
  })
}

export const getLocation = async (woeid) => {
  try{
    const weather = await Axios.get(`${LOCAL_URL}`,{params: {command: 'location', woeid}});
    return weather.data;
  } catch(error) {
    console.log(error);
    return {data: [error]};
  }
}