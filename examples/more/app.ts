import axios from '../../src';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// document.cookie = 'a=b';

// axios.get('/more/get').then(res => console.log(res));

// axios.post('http://localhost:8088/more/server2', {}, {
//   withCredentials: true,
// }).then(res => console.log(res));


// const instnce = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D',
// });

// instnce.get('/more/get').then(res => console.log(res));


const instance = axios.create();

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  function setupStartProgress() {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  function setupUpdateProgress() {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  function setupStopProgress() {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadeEl = document.getElementById('download')

downloadeEl.addEventListener('click', () => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})


const uploadeEl = document.getElementById('upload')

uploadeEl.addEventListener('click', () => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  console.log(fileEl.files[0], '=')
  if (fileEl.files) {
    data.append('file', fileEl.files[0]);
    instance.post('/more/upload', data)
  }
})
