// components/Home.js
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Restaurant } from './Restaurant';
import { listRestaurants } from '../graphql/queries';
import ListRestaurants from './ListRestaurants';

export function Home() {
  const [data, setData] = useState([]);
  const allRestaurants = async () => {
    const restaurants = await API.graphql(graphqlOperation(listRestaurants));
    setData(restaurants.data.listRestaurants.items);
    //console.log(data);
  };
  useEffect(() => {
    allRestaurants();
  }, []);
  return (
    <>
      <Restaurant />
      <ListRestaurants data={data} />
    </>
  );
}
