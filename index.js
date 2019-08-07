const axios = require('axios')

module.exports = ({ token, owner, repo, file, extract, branch }) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${file}?ref=${branch}`
    const headers = {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3.raw',
    }
    return axios({ headers, url })
}