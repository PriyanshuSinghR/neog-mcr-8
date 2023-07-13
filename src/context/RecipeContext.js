import { createContext, useReducer } from 'react';
import { restaurantsData } from '../data';

export const RecipeContext = createContext();

const reduceRecipe = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CUISINE':
      return {
        ...state,
        filterCuisine: action.payload,
      };
    case 'UPDATE_RESTAURANTS':
      return {
        ...state,
        allRestaurant: action.payload,
      };

    default:
      break;
  }
};

export function RecipeProvider({ children }) {
  const [state, dispatch] = useReducer(reduceRecipe, {
    filterCuisine: null,
    allRestaurant: restaurantsData,
  });

  return (
    <RecipeContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
