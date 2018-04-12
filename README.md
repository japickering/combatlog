## Combat log project for action RPG game

### Features
This app displays combat text over time using player stats manipulated in realtime output to a textbox on the page.
Status messages display in colours highlighting the game events taking place. In the finished product these events will be linked to graphics in the GUI I will create later on.

Latest test was adding health checks to ensure enemies can only perform actions while alive and display user feedback if this is true.

## Installation
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

First, you will need to install [node.js](https://nodejs.org).

Next git clone the repo to a local directory and run these console commands into a terminal:
```bash
cd combatlog
npm install
npm start
```
To create a new build for deployment run the console command then follow the steps to run the server on a port of your choice:
```bash
yarn build
```

## Changelog
- Added health checks to enemies
- Split players stats into distinct objects
- added dmg calculation and heal effects
- added actions queue
- hit and miss damage text
- damage text highlighting
- tick() and doCombatLog() changes 
- Fixed up combat text functions
- Initial commit