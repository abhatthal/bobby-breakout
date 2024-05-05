## Developer setup

Run these in the root of the repo:
* `$ npm install`
* Create a new file `.git/hooks/pre-commit` and paste this code inside it:
```
#!/bin/bash
# From https://gist.github.com/dahjelle/8ddedf0aebd488208a9a7c829f19b9e8
for file in $(git diff --cached --name-only | grep -E '\.(js|jsx)$')
do
  git show ":$file" | node_modules/.bin/eslint --stdin --stdin-filename "$file" # we only want to lint the staged changes, not any un-staged changes
  if [ $? -ne 0 ]; then
    echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
    exit 1 # exit with failure status
  fi
done
```

* `$ chmod +x .git/hooks/pre-commit`

---

## Database setup

1. Initialize database with
    `create table users(username varchar(255), password varchar(255), premium bool);`
2. Set `DB_URL` environment variable on server

