import rp from 'request-promise';

const GET = {
  method: 'GET',
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

const POST = {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
    },
    json: true
};

function get_GET_options(url) {
  return Object.assign({}, GET, { url });
}

function get_POST_options(url, formData) {
  return Object.assign({}, POST, { url, formData });
}

const request = {
  get_dataset() {
    return '';
  },

  upload_dataset(formData) {
    return fetch('/api/upload_dataset', {
      method: 'POST',
      body: formData
    });
  }, 

  get_relations(name) {
    let options = {
        uri: 'http://localhost:5000/api/get_relations?name=' + name,
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true
    };
    
    return rp(options);
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
