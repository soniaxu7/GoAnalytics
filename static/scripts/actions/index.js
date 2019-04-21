/*
* Redux React Actions:
* This is equal to controller in MVC model
* https://redux.js.org/basics/actions#action-creators
*/

export const addDataset = data => ({
  type: 'ADD_DATASET',
  data
});
