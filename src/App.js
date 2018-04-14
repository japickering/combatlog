import React from 'react';
import player from './entities/player';
import enemy from './entities/enemy';
import titleCase from './utils/titlecase.js';

class App extends React.Component {

   constructor(props) {
      super(props);
      this.player = player;
      this.enemy = enemy;
      this.maxhealth = 100;
      this.kill = this.kill.bind(this);
      this.beginCombat = this.beginCombat.bind(this);
      this.getFullName = this.getFullName.bind(this);
      this.getClassName = this.getClassName.bind(this);
      this.getTargetInfo = this.getTargetInfo.bind(this);
      this.doWeaponDamage = this.doWeaponDamage.bind(this);
      this.doPowerDamage = this.doPowerDamage.bind(this);
      this.doCombatLog = this.doCombatLog.bind(this);
      this.missTarget = this.missTarget.bind(this);
      this.playerDealsDamage = this.playerDealsDamage.bind(this);
      this.enemyDealsDamage = this.enemyDealsDamage.bind(this);
      this.leechHealth = this.leechHealth.bind(this);
      this.handleReloadClick = this.handleReloadClick.bind(this);
      this.items = [];

      this.state = {
         messages: [],
         seconds: 0
      }
   }

   componentDidMount() {
      this.interval = setInterval(() => 
         this.tick(), 500
      );
      // Optional instant display 
      // this.items = this.doCombatLog();
      // let results = this.items.map(function(item) {
      //    return item;
      // });
      // this.setState({
      //    messages: results
      // });
   }

   componentWillUnmount() {
      // clearInterval(this.interval);
   }

   handleReloadClick(){
      clearInterval(this.interval);
      this.setState({
         messages: [],
         seconds: 0
      });
      this.interval = setInterval(() => 
         this.tick(), 500
      );
      // Optional instant display 
      // this.items = this.doCombatLog();
      // let results = this.items.map(function(item) {
      //    return item;
      // });
      // this.setState({
      //    messages: results
      // });
   }

   getFullName(ob) {
      return titleCase(ob.first) + " " + titleCase(ob.last);
   }

   getClassName(ob) {
      return titleCase(ob.classname);
   }

   getTargetInfo(ob){
      return this.getFullName(ob) + ' HP : ' + ob.health.toString();
   }

   missTarget(ob){
      return "misses " + this.getFullName(ob);
   }

   doWeaponDamage(ob) {
      return this.getFullName(ob) + ' attacks with ' + ob.weapon.name;
   }

   doPowerDamage(ob) {
      return this.getFullName(ob) + ' attacks with ' +ob.power.name;
   }

   kill(ob){
      return this.getFullName(ob) + ' is dead';
   }

   playerDealsDamage(pc, npc) {
      let amount = pc.weapon.damage + pc.power.damage;
      if(this.player.health <= 0) {
         return this.getFullName(pc) + ' is dead';
      } else if (npc.health > 0){
         if(this.enemy.health === this.maxhealth){
            this.enemy.health -= amount;
         } else {
            return 'total damage : ' + amount.toString();
         }
      } else {
         return this.kill(npc);
      }
   }

   enemyDealsDamage(pc, npc){
      let amount = npc.weapon.damage + npc.power.damage;
      if(this.enemy.health <= 0) {
         return this.getFullName(npc) + ' is dead';
      } else if (pc.health > 0){
         if(this.player.health === this.maxhealth){
            this.player.health -= amount;
         } else {
            return 'total damage : ' + amount.toString();
         }
      } else {
         return this.kill(pc);
      }
   }

   leechHealth(pc){
      let amount = pc.weapon.damage;
      if(pc.health < this.maxhealth){
         this.player.health += amount;
         return this.getFullName(pc) + ' healed for ' + amount.toString();
      } else {
         return this.getFullName(pc) + ' at full health';
      }
   }

   beginCombat(pc, npc){
      return this.getTargetInfo(pc) + ' fights ' + this.getTargetInfo(npc);
   }

   // doCombatLog() {
   doCombatLog(index) {
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
         { text:this.doWeaponDamage(pc), style:styles.dmg },
         { text:this.doPowerDamage(pc), style:styles.dmg },
         { text:this.playerDealsDamage(pc, npc), style:styles.dmg },
         { text:this.getTargetInfo(npc), style:styles.message },
         { text:this.doWeaponDamage(npc), style:styles.hit },
         { text:this.doPowerDamage(npc), style:styles.hit },
         { text:this.enemyDealsDamage(pc, npc), style:styles.hit },
         { text:this.getTargetInfo(pc), style:styles.message },
         { text:this.leechHealth(pc, npc), style:styles.heal },
         { text:this.getTargetInfo(pc), style:styles.message },
         { text:'End of log', style:styles.miss }
      ];
      const concatItems = this.state.messages.concat(actions[index]);      
      console.log(concatItems);
      return concatItems;
      // return actions;
   }

   tick() {
      let timelimit = 11;
      if(this.state.seconds < timelimit) {
         this.items = this.doCombatLog(this.state.seconds);
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