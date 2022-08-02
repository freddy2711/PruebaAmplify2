import axios from 'axios'

const axiosfetchPublic = axios.create({
  baseURL:`${'/api'}`,
  headers: {
    'Content-Type': 'application/json'
  },
})

export default axiosfetchPublic;

// const { data } = await clienteAxios.post(`/users/login`, { email, password });

// const axiosfetchPrivate2 = axios.create({
//   url: '/post',
//   baseURL:`${'/api'}`,
//   method: 'POST',
//   timeout: 1000
// });
// export default axiosfetchPrivate2;

export const axiosfetchPrivate = axios.create({
  baseURL:`${process.env.BACKEND_URL}`,
  headers: {
    'x-api-key': `${process.env.BACKEND_APIKEY}`,
    'Content-Type': 'application/json' 
  }
})
