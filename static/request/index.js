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

function get_dataset() {
  let url = 'http://localhost:5000/api/get_dataset';
  let options = get_GET_options(url);

  return rp(options);
}

function upload_dataset(data) {
  let options =   {
    method: 'POST',
    url: 'http://localhost:5000/api/upload_dataset',
    headers: {
      'content-type': 'multipart/form-data',
    },
    multipart: {
         chunked: false,
         data:[
          {
            'Content-Disposition': 'form-data; name="name"',
            body :  data.name
          },
          {
            'Content-Disposition': 'attachment; filename=MyVerySpecial.csv',
            'Content-Type': 'text/csv',
            body: data.initiative
          }
          ]
      },
    json: true
  };
  console.log(data)
  // let url = ;
  // let options = get_POST_options(url, data);

  return rp(options);
}

export default {
  get_dataset,
  upload_dataset
}
