import React from "react";

function titleCase(str) {
    return str.replace(/\w\S*/g, 
    function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const player = {
   first: 'Jorvund',
   last: 'Greymane',
   classname: 'dragonknight',
   skill: 'flame',
   health: 100,
   str: 2,
   dex: 1,
   mag: 1,
   armour: 'heavy',
   weapon: 'greatsword',
   weapondmg: 10,
   attacks: 1,
   power: 'searing strike',
   powerdmg: 20
}
const enemy = {
   first: 'Abnur',
   last: 'Tharn',
   classname: 'sorcerer',
   skill: 'destruction',
   health: 100,
   str: 1,
   dex: 1,
   mag: 2,
   armour: 'light',
   weapon: 'staff',
   weapondmg: 10,
   attacks: 1,
   power: 'lightning blast',
   powerdmg: 20
}

class App extends React.Component {

   constructor(props) {
      super(props);
      this.getFullName = this.getFullName.bind(this);
      this.getClassName = this.getClassName.bind(this);
      this.getTargetInfo = this.getTargetInfo.bind(this);
      this.doWeaponDamage = this.doWeaponDamage.bind(this);
      this.doPowerDamage = this.doPowerDamage.bind(this);
      this.playerDamageDone = this.playerDamageDone.bind(this);
      this.doCombatLog = this.doCombatLog.bind(this);
      this.missTarget = this.missTarget.bind(this);
      this.kill = this.kill.bind(this);
      this.enemyAttacks = this.enemyAttacks.bind(this);
      this.leechHealth = this.leechHealth.bind(this);
      this.items = [];
      this.handleReloadClick = this.handleReloadClick.bind(this);

      this.state = {
         player: player,
         enemy: enemy,
         health: player.health,
         enemyhealth: enemy.health,
         messages: [],
         seconds: 0,
         interval: 1000
      }
   }

   componentDidMount() {
      this.interval = setInterval(() => 
         this.tick(), this.state.interval
      );
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   handleReloadClick(){
      clearInterval(this.interval);
      this.setState({
         player: player,
         enemy: enemy,
         health: player.health,
         enemyhealth: enemy.health,
         messages: [],
         seconds: 0,
         interval: 1000
      });
      this.componentDidMount();
   }

   getFullName(ob) {
      return titleCase(ob.first) + " " + titleCase(ob.last);
   }

   getClassName(ob) {
      return titleCase(ob.classname);
   }

   getPlayerInfo(ob){
      return this.getFullName(ob) + ' HP : ' + this.state.health.toString();
   }

   getTargetInfo(ob){
      return this.getFullName(ob) + ' HP : ' + this.state.enemyhealth.toString();
   }

   missTarget(ob){
      return "misses " + this.getFullName(ob);
   }

   doWeaponDamage(ob) {
      return 'Attacks with ' + ob.weapon;
   }

   doPowerDamage(ob) {
      return 'Attacks with ' +ob.power;
   }

   kill(ob){
      return this.getFullName(ob) + ' is dead';
   }

   playerDamageDone(pc, npc) {
      let amount = pc.weapondmg + pc.powerdmg;
      this.setState({
         enemyhealth: enemy.health - amount
      });
      return 'total damage : ' + amount.toString();
   }

   enemyAttacks(pc, npc){
      let amount = npc.weapondmg + npc.powerdmg;

      if(this.state.enemyhealth <= 0) {
         return this.kill(npc);
      } else {
         let msg = this.doWeaponDamage(npc) + ' on ' + this.getFullName(pc);
         this.setState({
            health: player.health - amount
         });
         msg += ' total damage: ' + amount.toString();
         return msg;
      }
   }

   leechHealth(pc){
      let amount = pc.weapondmg;
      if(this.state.health < player.health){
         this.setState({
            health: this.state.health + amount
         });
         return this.getFullName(pc) + ' healed for ' + amount.toString();
      } else {
         return this.getFullName(pc) + ' at full health';
      }
   }

   doCombatLog(seconds) {
      let pc = this.state.player;
      let npc = this.state.enemy;

      const styles = {
         message: {
            color: "cyan"
         },
         dmg: {
            color: "yellow"
         },
         hit: {
            color: "crimson"
         },
         miss: {
            color: "green"
         },
         heal: {
            color: "pink"
         }
      }
      const actions = [
         { text:this.getPlayerInfo(pc), style:styles.message },
         { text:this.doWeaponDamage(pc), style:styles.dmg },
         { text:this.doPowerDamage(pc), style:styles.dmg },
         { text:this.playerDamageDone(pc, npc), style:styles.dmg },
         { text:this.getTargetInfo(npc), style:styles.message },
         { text:this.enemyAttacks(pc, npc), style:styles.hit },
         { text:this.getPlayerInfo(pc), style:styles.message },
         { text:this.leechHealth(pc, npc), style:styles.heal },
         { text:this.getPlayerInfo(pc), style:styles.message },
         { text:'End of log', style:styles.miss }
      ];
      const concatItems = this.state.messages.concat(actions[seconds]);      
      // console.log(concatItems);
      return concatItems;
   }

   tick() {
      let timelimit = 10;
      if(this.state.seconds < timelimit) {
         this.items = this.doCombatLog(this.state.seconds);
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds + 1
            // seconds: prevState.seconds + .5
         }));
      } else {
         this.setState(prevState => ({
            player: player,
            enemy: enemy,
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