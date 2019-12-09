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

    case 'HYDRATE_KERNEL_ORG_DATA': {
      const [data] = action.data.results;
      return {
        ...state,
        kernelorg: data,
      };
    }

    case 'ADD_KERNEL_DATA': {
      const [kernel] = action.data.results;
      return {
        ...state,
        kernels: [...state.kernels, kernel],
      };
    }

    default:
      return state;
  }
};
