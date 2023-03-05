// components/Home.js
import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Restaurant } from './Restaurant';
import { listRestaurants } from '../graphql/queries';

export function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const allRestaurants = async () => {
      const restaurants = await API.graphql(graphqlOperation(listRestaurants));
      setData(restaurants.data.listRestaurants.items);
      //console.log(data);
    };
    allRestaurants();
  }, []);
  return (
    <>
      <Restaurant data={data} />
      {/* <ListRestaurants /> */}
    </>
  );
}
