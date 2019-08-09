const axios = require('axios')

module.exports = ({ url, payload }) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    const text = "```" + JSON.stringify(payload) + "```"
    return axios.post(url, { text }, headers)
}