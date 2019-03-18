import langFile from '../../data/data_list.json';

const initial_lists = JSON.parse(langFile).data;

const todos = (state = initial_lists, action) => {
  switch (action.type) {
    case 'ADD_DATASET':
      const lists = Array.from(state);
      lists.push(action.data);

      console.log(lists)

      return lists;
    default:
      return state;
  }
}

export default todos;
