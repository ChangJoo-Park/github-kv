# GitHub Key-Value Store

GitHub as a Key Value store.

## Caveat


When [create new Personal Access Token](https://github.com/settings/tokens/new), You should check only repo.


## Usage

```bash
# gh-kv --token <GitHub Token> --owner <Owner or Organization> --repo <REPO_NAME> --file <TARGET_FILENAME> --extract <OUTPUT_FILENAME>
gh-kv --token <GitHub Token> --owner changjoo-park --repo kv --file store.json --extract key.json
```
