import axios, { Canceler } from '../../src';

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('Request cancel', e.message);
  }
})

setTimeout(() => {
  source.cancel('Opertion canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, {
    cancelToken: source.token
  }).catch(e => {
    if (axios.isCancel(e)) {
      console.log(e.message, '==');
    }
  })
}, 100)


let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('Request canceled');
  }
})

setTimeout(() => {
  cancel()
}, 200)
