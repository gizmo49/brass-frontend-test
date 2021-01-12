import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_PAYMENT_GATEWAY_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PAYMENT_GATEWAY_SECRET_KEY}`,
    },
});

export default API;
