#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const axios = require('axios')
const minimist = require('minimist')

const args = minimist(process.argv.slice(2), {
    string: ['token', 'owner', 'repo', 'file', 'extract'],
    alias: { t: 'token', o: 'owner', r: 'repo', f: 'file', e: 'extract' }
})

const { token, owner, repo, file, extract } = args

if (!token || !owner || !repo || !file) {
    console.log('PLEASE CHECK arguments')
    return
}

const url = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`
const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3.raw',
}
axios({ headers, url })
    .then(response => {
        console.log(response.data)
        if (extract) {
            fs.writeFileSync(extract, JSON.stringify(response.data))
        }
    })
    .catch(error => {
        console.error(error.response.data)
    })
