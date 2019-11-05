# Bobby's Breakout

<a href="https://gentle-savannah-07254.herokuapp.com/"><b>Play Now!</b></a>

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

<a name="user-stories">

## User Stories

**User Story 1**\
The user gets to choose one of two possible approaches to gameplay: a passive stealth route or an aggressive “beat-em-up” or “kill-em-all” route. The scenario depends on the choices the player makes during interactions with other entities within the game. The passive route is takes more time and requires the player to be more meticulous and complete more side quests, while the aggressive route is faster but also comes with a higher risk. If the player engages in combat with other entities too much, more difficult enemies are spawned and the chance of getting an “instant defeat” through being too violent increases. However if the player is too passive, enemies will increase their surveillance area to track the player down.


**User Story 2**\
The user gets to modify the possible attacking moves of Bobby Chan by changing equipped items through an inventory menu. The menu can be reached by pressing a hotkey.  

**User Story 3**\
The user must interact with the environment and other entities of the game to proceed to certain locked or initially blocked off areas. 


---


## About Us

Coming soon!

---

## Developer setup

Run these in the root of the repo:
* `npm install`
* 
```
echo '#!/bin/bash
# From https://gist.github.com/dahjelle/8ddedf0aebd488208a9a7c829f19b9e8
for file in $(git diff --cached --name-only | grep -E '\.(js|jsx)$')
do
  git show ":$file" | node_modules/.bin/eslint --stdin --stdin-filename "$file" # we only want to lint the staged changes, not any un-staged changes
  if [ $? -ne 0 ]; then
    echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
    exit 1 # exit with failure status
  fi
done' > .git/hooks/pre-commit
```

* `chmod +x .git/hooks/pre-commit`



## Database setup

1. change the connection string in main.js
2. run create table users(username varchar(255), password varchar(255), premium bool);

Note: need to add more field to DB for player status
