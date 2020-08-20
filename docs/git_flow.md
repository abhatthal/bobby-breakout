# CMPT276
CMPT 276 group project

## Heroku
⬢ gentle-savannah-07254

https://gentle-savannah-07254.herokuapp.com/ | https://git.heroku.com/gentle-savannah-07254.git

* Make sure to add the Heroku Git URL to your git remote.
```
git remote add heroku https://git.heroku.com/gentle-savannah-07254.git
```

## How to Collaborate: Git Flow

<ol>
<li>Check GitHub Projects for anyone working on a new or existing feature ("In progress")</li>
<li>Let people know in GitHub Projects what feature you wish to work on (Update "In progress")</li>
<li>Add a feature using the <a href=https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows>Git Flow</a>:
    <ul>
    <li>Create a topic branch on the develop branch of an appropriate name</li>
    <li>git pull</li>
    <li>git checkout [topicBranchName]</li>
    <li>Make and test your feature (with sensible commit messages along the way)</li>
    <li>Push changes to your topic branch</li>
    <li>Start a pull request to have topic merged with develop and notify the Discord group</li>
    <li>After group approval, merge into develop</li>
    <li>Close topic branch</li>
    <li>Update GitHub Projects to indicate that the feature is completed and the branch is merged</li>
    </ul>
</li>
<li>Ready to add features to our stable master branch?
    <ul>
    <li><a href =https://stackoverflow.com/questions/14168677/merge-development-branch-with-master>Merge master into develop.</a> It's better to resolve conflicts in develop.</li>
    <li>Start a pull request to merge develop into master (do not delete the develop branch)</li>
    </ul>
</li>
<li>Has a critical bug been found in master that must be dealt with immediately?
    <ul>
        <li>Update "In Progress" with [URGENT]</li>
        <li>Notify Discord group (@everyone)</li>
        <li>Create a hotfix branch off master to fix bug</li>
        <li>Start a pull request to merge into master</li>
        <li>merge hotfix branch into develop</li>
        <li>close hotfix branch</li>
    </ul>
</li>
</ol>

[![Workflow Strategies](http://img.youtube.com/vi/aJnFGMclhU8/0.jpg)](https://youtu.be/aJnFGMclhU8?t=194)

## Branch Overview
<table>
    <tr>
        <th>master</th>
        <td>where stable release code lives</td>
    </tr>
    <tr>
        <th>master -> hotfix</th>
        <td>where critical bugs are immediately dealt with</td>
    </tr>
    <tr>
        <th>master -> develop</th>
        <td>where unstable code is tested</td>
    </tr>
    <tr>
        <th>master -> develop -> aNewFeature</th>
        <td>where a new feature is developed by ONE collaborator</td>
    </tr>
</table>
