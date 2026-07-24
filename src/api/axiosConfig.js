// import axios from 'axios';
// import nprogress from 'nprogress';
// import 'nprogress/nprogress.css';

// nprogress.configure({ showSpinner: false});

// const api = axios.create({
//   baseURL: "http://localhost:5173",
//   withCredentials: true
// });

// // --- PASTE STEP 5 HERE ---
// let activeRequests = 0;
// const startLoading = () => {
//   if (activeRequests === 0) nprogress.start();
//   activeRequests++;
// };
// const stopLoading = () => {
//   activeRequests--;
//   if (activeRequests <= 0) {
//     activeRequests = 0;
//     nprogress.done();
//   }
// };


// api.interceptors.request.use((config) => {
//   startLoading();
//   return config;
// }, (error) => {
//   stopLoading()
//   return Promise.reject(error);
// });

// api.interceptors.response.use((response) => {
//   stopLoading();
//   return response;
// }, (error) => {
//   stopLoading;
//   return Promise.reject(error);
// });

// export default api;
