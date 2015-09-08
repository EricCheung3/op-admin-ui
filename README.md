# README #

This README would normally document whatever steps are necessary to get your application up and running.

### This is the repo for OpenPrice Admin UI App code. ###

Developer Guide
================

## Local Development Environment Setup ##
First you need to install and setup tools needed for local development. Prefer Ubuntu or Mac OS X. Avoid Windows.

### NodeJS ###

Install [NodeJS 0.12.7](https://nodejs.org/)

### Javascript Tools ###

Install gulp and bower
~~~
npm install -g gulp
npm install -g bower
~~~

### ATOM ###
Install [ATOM Text Editor](https://atom.io/)

This is optional. You can choose whatever Text Editor tool for Web development.

### Others ###

Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Install [Docker](https://docs.docker.com/installation/)

## Bitbucket Account ##

Create free account in Bitbucket:
[https://bitbucket.org/](https://bitbucket.org/)

Ask admin to add your account to groundtruthinc team.

Setup [SSH key for Bitbucket](https://confluence.atlassian.com/display/BITBUCKET/How+to+install+a+public+key+on+your+Bitbucket+account)

## Run OpenPrice AdminUI Project locally first time ##

### Checkout code ###
Check out the code from Bitbucket 
```
git clone git@bitbucket.org:groundtruthinc/openprice-admin-ui.git
```

### Install dependencies ###

First time, you need to install node modules and bower components. Inside openprice-admin-ui folder, run
```
npm install
bower install
```

### Run with Browser ###
You can run OpenPrice AdminUI app inside browser:
```
gulp serve
```
It will open a browser window and display the login page. You can login with your account.

## On-going Development Process ##
The master branch is for production release, and for each developer, we are all working on 
release branch, such as release1, release2, etc.


So we need to switch to development branch, such as release1:

```
git checkout release1
```

After you have done code changes, you first need to commit it, for example:
```
git add .
git commit -m 'my code change for issue-31'
```

Then you merge with remote release branch, then push the changes:

```
git pull
git push
```

If `git pull` return merge error, you need to manually fix the merge conflict, before push.