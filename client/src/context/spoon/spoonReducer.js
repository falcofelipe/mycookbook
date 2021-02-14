import {
  SEARCH_SPOON,
  SET_LOADING,
  CLEAR_SPOON,
  GET_SPOON,
  SPOON_ERROR,
} from '../types';

const spoonReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_SPOON:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case CLEAR_SPOON:
      return {
        ...state,
        recipes: [],
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SPOON:
      return {
        ...state,
        recipe: action.payload,
        loading: false,
      };
    case SPOON_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default spoonReducer;
