import axios from "axios";
export default function ApiService(url, method = "POST", data = null) {
  return axios({
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("API Call Error", error);
      throw error;
    });
}
