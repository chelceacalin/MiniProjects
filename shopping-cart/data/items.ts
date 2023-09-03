import axios from "axios";

const URL = "https://api.slingacademy.com/v1/sample-data/photos";
export const fetchData = () => {
  return axios
    .get(URL)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
