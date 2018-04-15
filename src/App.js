import React from 'react';
import player from './entities/player';
import enemy from './entities/enemy';
import targetInfo from './utils/targetinfo';
import playerDamage from './actions/playerdamage';
import enemyDamage from './actions/enemydamage';
import leechLife from './actions/leechlife';
import doWeaponDamage from './actions/doweapondamage';
import doPowerDamage from './actions/dopowerdamage';

class App extends React.Component {

   constructor(props) {
      super(props);
      this.items = [];
      this.player = player;
      this.enemy = enemy;
      this.doCombatLog = this.doCombatLog.bind(this);
      this.handleReloadClick = this.handleReloadClick.bind(this);
      this.isDisplayAll = false;

      this.state = {
         messages: [],
         seconds: 0
      }
   }

   componentDidMount() {
      if(this.isDisplayAll){
         console.log('Display mode: all');
         this.items = this.doCombatLog();
         let results = this.items.map(function(item) {
            return item;
         });
         this.setState({
            messages: results
         });
      } else {
         console.log('Display mode: timer');
         this.interval = setInterval(() => 
            this.tick(), 500
         );
      }
   }

   handleReloadClick(){
      // clearInterval(this.interval);
      this.setState({
         messages: [],
         seconds: 0
      });
      if(this.isDisplayAll){
         this.items = this.doCombatLog();
         let results = this.items.map(function(item) {
            return item;
         });
         this.setState({
            messages: results
         });
      } else {
         this.interval = setInterval(() => 
            this.tick(), 500
         );
      }
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   beginCombat(pc, npc){
      return targetInfo(pc) + ' fights ' + targetInfo(npc);
   }

   // doCombatLog() {
   doCombatLog() {
      let pc = this.player;
      let npc = this.enemy;
      const styles = {
         message: {color: "#fff"},
         dmg: {color: "lightgreen"},
         hit: {color: "crimson"},
         miss: {color: "green"},
         heal: {color: "orange"}
      };
      const actions = [
         { text:this.beginCombat(pc, npc), style:styles.message },
         { text:doWeaponDamage(pc), style:styles.dmg },
         { text:doPowerDamage(pc), style:styles.dmg },
         { text:playerDamage(pc, npc), style:styles.dmg },
         { text:targetInfo(npc), style:styles.message },
         { text:doWeaponDamage(npc), style:styles.hit },
         { text:doPowerDamage(npc), style:styles.hit },
         { text:enemyDamage(pc, npc), style:styles.hit },
         { text:targetInfo(pc), style:styles.message },
         { text:leechLife(pc, npc), style:styles.heal },
         { text:targetInfo(pc), style:styles.message },
         { text:'End of log', style:styles.miss }
      ];
      if(this.isDisplayAll){
         return actions;
      } else {
         const concatItems = this.state.messages.concat(actions[this.state.seconds]);      
         // console.log(concatItems);
         return concatItems;
      }
   }

   tick() {
      let timelimit = 11;
      if(this.state.seconds < timelimit) {
         this.items = this.doCombatLog();
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds + 1
         }));
      } else {
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds
         }));
         clearInterval(this.interval);
      }
   }

   render() {
      // console.log(this.state.messages);
      return (
         <main>
            <h1>Combat Log</h1>
            <button onClick={this.handleReloadClick}>Reload</button>
            <div className="timer">
              <strong>Seconds:</strong> {this.state.seconds}
            </div>
            <div className="textbox">
               {
                  this.state.messages.map((item) =>
                     <div className="damage-message" style={item.style}>
                     {item.text}
                     </div>
                  )
               }
            </div>
         </main>
      );
   }
}

export default App;