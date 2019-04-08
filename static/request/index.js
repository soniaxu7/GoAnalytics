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

  getColumnData(name, data) {

  }
};

export default request;
