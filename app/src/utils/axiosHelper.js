const axios = require('axios').default;

const instance = axios.create({
    baseURL: process.env.BACK_PY,
});

module.exports = instance