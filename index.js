#!/usr/bin/env node

const fs = require('fs')
const axios = require('axios')
const minimist = require('minimist')
const meow = require('meow')

const minimistOptions = {
    string: ['token', 'owner', 'repo', 'file', 'extract'],
    alias: { t: 'token', o: 'owner', r: 'repo', f: 'file', e: 'extract' }
}

const args = minimist(process.argv.slice(2), minimistOptions)

const { token, owner, repo, file, extract } = args

meow(`
    Usage:
        gh-kv [options]

        gh-kv --token <GitHub Token> --owner <Owner or Organization> --repo <REPO_NAME> --file <TARGET_FILENAME> --extract <OUTPUT_FILENAME>

    Options:
        -h, --help         print usage information
        -t, --token        access token for Github
        -o, --owner        target repository owner or organization
        -r, --repo         target repository name
        -f, --file         target file for fetch
        -e, --extract      file name for result eg. key.json [not required]`,
    minimistOptions)

if (!token || !owner || !repo || !file) {
    console.log('Need help? `gh-kv --help`')
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
