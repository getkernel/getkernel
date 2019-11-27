/**
 * Kernels reducer.
 */
import defaultState from './defaultState';

export { defaultState };

export default (state, action) => {
  switch (action.type) {
    case 'HYDRATE_INDEX_DATA':
      return {
        ...state,
        index: {
          items: action.data.results,
        },
      };

    case 'ADD_KERNEL_DATA':
      return {
        ...state,
        kernels: [...state.kernels, action.data],
      };

    default:
      return state;
  }
};
