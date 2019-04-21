/*
* Manage all the front end request here.
* Use "fetch" to apply Promise.
* Reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
*/

const request = {
  uploadDataset(formData) {
    return fetch('/api/upload_dataset', {
      method: 'POST',
      body: formData
    });
  }, 

  getRelations(name) {
    return fetch('/api/get_relations?name=' + name, {
      method: 'GET',
    }).then(res => res.json());
  },

  getColumnNames(name) {
    return fetch('/api/get_column_names?name=' + name, {
      method: 'GET',
    }).then(res => res.json());
  },

  getYears(name) {
    return fetch('/api/get_years?name=' + name, {
      method: 'GET',
    }).then(res => res.json());
  },

  getYearData({name, type, year}) {
    return fetch('/api/get_year_data?name=' + name + '&type=' + type + '&year=' + year, {
      method: 'GET',
    }).then(res => res.json());
  },

  // Since it needs to carry too much query data, it is recommended to use POST instead of GET
  getColumnData(data) {
    return fetch('/api/get_column_data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
};

export default request;
