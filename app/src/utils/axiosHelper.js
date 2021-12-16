const axios = require('axios').default;

const instance = axios.create({
    baseURL: process.env.BACK_PY,
});

const SCinstance = axios.create({
    baseURL: process.env.BACK_SC,
})

module.exports = { instance, SCinstance }