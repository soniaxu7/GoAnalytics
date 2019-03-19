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

    // var request = new XMLHttpRequest();
    // request.open("POST","/api/upload_dataset", true);

    // request.send(formData);
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
  }
};

export default request;
