import React, { useEffect, useState } from 'react';
import './ListRestaurants.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from '../graphql/queries';

const ListRestaurants = ({ data, updateList }) => {
  const sortedRestaurants = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    if (updateList) {
      const allRestaurants = async () => {
        const restaurants = await API.graphql(
          graphqlOperation(listRestaurants)
        );
        const newRes = restaurants.data.listRestaurants.items;
        const sortedNewRes = newRes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewData(sortedNewRes);
        // console.log(updateList);
        // console.log(newData);
      };
      allRestaurants();
    }
  }, [updateList, newData]);
  return (
    <div className="restaurant-list">
      <table>
        <thead>
          <tr>
            <th>S/No</th>
            <th>Name</th>
            <th>Description</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {updateList
            ? newData.map((restaurant, index) => (
                <tr key={restaurant.id}>
                  <td>{index + 1}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.description}</td>
                  <td>{restaurant.city}</td>
                </tr>
              ))
            : sortedRestaurants.map((restaurant, index) => (
                <tr key={restaurant.id}>
                  <td>{index + 1}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.description}</td>
                  <td>{restaurant.city}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRestaurants;
