import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { cuisineData, restaurantsData } from '../data';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { state, dispatch } = useContext(RecipeContext);
  const handleCuisine = (cuisineId) => {
    dispatch({ type: 'UPDATE_CUISINE', payload: cuisineId });
  };

  const filteredDishes = state?.allRestaurant?.filter(
    (restaurant) => restaurant.cuisine_id === state.filterCuisine,
  );

  return (
    <div>
      <h1>Food Ordering App</h1>
      <h2>Select Your Cuisine:</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '350px',
          margin: 'auto',
        }}
      >
        {cuisineData?.map((cuisine) => (
          <div
            key={cuisine.id}
            onClick={() => handleCuisine(cuisine.id)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {cuisine.name}
          </div>
        ))}
      </div>
      <div>
        {filteredDishes.length > 0 && (
          <>
            {filteredDishes.map((restaurant, id) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <h2>Dishes by {restaurant.name}</h2>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {restaurant.menu.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 0 20px rgba(211, 211, 211, 0.76)',
                        margin: '20px',
                        borderRadius: '10px',
                      }}
                    >
                      <div>
                        <img
                          src={item.imgSrc}
                          style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '5px 5px 0 0',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: '20px',
                          textAlign: 'left',
                        }}
                      >
                        <b>{item.name}</b>
                        <div style={{ color: 'gray' }}>
                          Rs. {item.price} for {item.qty}
                        </div>
                        <span>{restaurant.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
