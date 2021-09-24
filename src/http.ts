// import axios from "axios";

// export default axios.create({
//   baseURL: "https://swapi.dev/api/people",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://swapi.dev/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;