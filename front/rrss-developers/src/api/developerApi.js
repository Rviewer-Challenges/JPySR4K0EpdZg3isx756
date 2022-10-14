import axios from "axios";

const developerApi = axios.create({
    baseURL: process.env.REACT_APP_BACK_BASE_URL
});


export default developerApi; 