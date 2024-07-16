import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [dishes, setDishes] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/dish/dishes');
      setDishes(res.data);
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const togglePublished = (dishId) => {
    axios.put(`http://localhost:5000/api/dish/toggle/${dishId}/`)
      .then(response => {
        setDishes(dishes.map(dish => dish.dishId === dishId ? response.data : dish));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <ul className='flex items-center justify-center justify-items-start m-5 p-5'>
        {dishes.map(dish => (
          <li key={dish.dishId} className='my-10 p-10 bg-gray-300 mx-8 h-64'>
            <img src={dish.imageUrl} alt={dish.dishName} width="100" />
            <h2>{dish.dishName}</h2>
            <p>{dish.isPublished ? 'Published' : 'Unpublished'}</p>
            <button className='bg-blue-600  p-3 rounded-lg' onClick={() => togglePublished(dish.dishId)}>
              {dish.isPublished ? 'Unpublish' : 'Publish'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
