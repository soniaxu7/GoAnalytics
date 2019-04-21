/*
* Redux recuder: https://redux.js.org/basics/reducers
*/  

import langFile from '../../data/data_list.json';

// initial dataset list
const initial_lists = JSON.parse(langFile).data;

const todos = (state = initial_lists, action) => {
  switch (action.type) {
    case 'ADD_DATASET':
      const lists = Array.from(state); // push new dataset
      lists.push(action.data);
      return lists;
    default:
      return state;
  }
}

export default todos;
