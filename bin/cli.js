#!/usr/bin/env node
const fs = require('fs')
const minimist = require('minimist')
const meow = require('meow')
const getStore = require('../')
const postWebHook = require('../transporter')

const minimistOptions = {
    string: ['token', 'owner', 'repo', 'file', 'extract', 'silent', 'branch', 'webhook'],
    alias: { t: 'token', o: 'owner', r: 'repo', f: 'file', e: 'extract', b: 'branch', w: 'webhook' }
}

const args = minimist(process.argv.slice(2), minimistOptions)

const { token, owner, repo, file, extract, silent = false, branch = 'master', webhook } = args

meow(`
    Usage:
        gh-kv [options]

        gh-kv --token <GitHub Token>
              --owner <Owner or Organization>
              --repo <REPO_NAME>
              --file <TARGET_FILENAME>
              --extract <OUTPUT_FILENAME>
              --webhook <POST_URL>

    Options:
        -h, --help         print usage information
        -t, --token        access token for Github
        -o, --owner        target repository owner or organization
        -r, --repo         target repository name
        -f, --file         target file for fetch
        -b, --branch       GitHub repository branch. default: master
        -e, --extract      file name for result eg. key.json [not required]
        -w, --webhook      webhook URL. POST request when someone token called [not required]
        --silent           do not print result.
        `,
    minimistOptions)

if (!token || !owner || !repo || !file) {
    console.log('Need help? `gh-kv --help`')
    return
}

getStore({ token, owner, repo, file, extract, branch })
    .then(response => {
        const { data } = response.data
        if (!silent) {
            console.log(data)
        }
        if (extract) {
            fs.writeFileSync(extract, JSON.stringify(data))
        }

        if (webhook) {
            postWebHook({
                url: webhook,
                payload: { owner, repo, file, branch, data }
            })
            .then(response => {console.log('webhook : ', response.data)})
            .catch(error => console.log(error.response.data))
        }
    })
    .catch(error => {
        console.error(error.response.data)
    })
