import React from 'react';
import './ListRestaurants.css';

const ListRestaurants = ({ data }) => {
  console.log('data = ', data);
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
          {data.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
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
