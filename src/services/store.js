import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://t-cons.sgp1.digitaloceanspaces.com`,
});
// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=%E0%B9%84%E0%B8%9C%E0%B9%88%E0%B8%82%E0%B8%A7%E0%B8%B2%E0%B8%87&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyC04B8E84MbzmNhZAnvUtPbTSom6aYJmOw

const store = {
  list: () => axiosInstance.get("/t_cons_stores.json"),
};

export default store;
