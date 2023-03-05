import React, { useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createRestaurant } from '../graphql/mutations';
import './Restaurant.css';
import ListRestaurants from './ListRestaurants';

export function Restaurant({ data }) {
  const { route } = useAuthenticator((context) => [context.route]);
  const [updateList, setUpdateList] = useState(false);

  const CreateRestaurantForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) =>
      setDescription(event.target.value);
    const handleLocationChange = (event) => setCity(event.target.value);

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const input = { name, description, city };
        const { data } = await API.graphql(
          graphqlOperation(createRestaurant, { input })
        );
        console.log(data);
        setName('');
        setDescription('');
        setCity('');
        setUpdateList(true);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={city}
          onChange={handleLocationChange}
          required
        />

        <button type="submit">Create Restaurant</button>
      </form>
    );
  };
  return route === 'authenticated' ? (
    <>
      <CreateRestaurantForm />
      <ListRestaurants data={data} updateList={updateList} />
    </>
  ) : (
    'Loading ...'
  );

  // const message =
  //   route === 'authenticated' ? CreateRestaurantForm : 'Loading...';
  // return { message };
}
