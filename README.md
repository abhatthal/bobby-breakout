# Bobby's Breakout

<a href="https://project-276.herokuapp.com/"><b>Play Now!</b></a>

## Table of Contents
[Target Audience](#target-audience)\
[Synopsis](#synopsis)\
[Game Features](#features)\
[User Stories](#user-stories)\
[About Us](#about-us)

---

<a name="target-audience">

## Target Audience
Our game's target audience are students and young adults who are curious of what it's like to be popular professor.

---


<a name="synopsis">

## Synopsis

**Bobby’s Breakout**​ is a single-player 2D top-down open-world adventure game set at SFU where the player takes a peek into the life of Dr. Bobby Chan. They will experience Bobby’s acute stress response to being swarmed by an apocalyptic hoard of students seeking help / advice, complaints, or just to be a nuisance. Bobby will have to make his way through the maze of antagonistic students, professors, and environmental obstructions to leave campus (the winning condition) and safely return home to his family… only to do this again the next day. 

---

<a name="features">

## Game Features

Our application will utilize the Google Identity Platform where users can securely register for our game. It will feature an open-world map that is dynamically loaded when the player reaches a certain threshold in their locally rendered screen. Loading of the map is further optimized through a novel machine learning algorithm that will predict and pre-fetch the appropriate map regions to render. To add interaction with the environment, we will be integrating interactive components such as walls and locked doors that will require certain item drops in order to proceed. Thus, a simple inventory system will be implemented to handle this. There will be a turn-based combat system similar to Pokemon that is triggered on contact with an enemy. An achievement system will also be integrated to all the activities the user does - whether that be staying inactive for a set amount of time, killing all enemies, playing passively, etc.

---


## About Us

Coming soon!

---

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



## Database setup

1. change the connection string in main.js
2. run `create table users(username varchar(255), password varchar(255), premium bool);`

Note: need to add more field to DB for player status
