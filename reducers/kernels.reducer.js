/**
 * {
 *    index: [],
 *    kernels: [
 *      {
 *        ...
 *      }
 *    ]
 * }
 */

export default (state, action) => {
  switch (action.type) {
    case 'HYDRATE_INDEX_DATA':
      return {
        ...state,
        index: action.data,
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
