import React from "react";

function titleCase(str) {
    return str.replace(/\w\S*/g, 
    function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var stats = [
   {
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
   },
   {
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
];

class App extends React.Component {

   constructor(props) {
      super(props);
      this.sum = this.sum.bind(this);
      this.getFullName = this.getFullName.bind(this);
      this.getClassName = this.getClassName.bind(this);
      this.getTargetInfo = this.getTargetInfo.bind(this);
      this.doWeaponDamage = this.doWeaponDamage.bind(this);
      this.doPowerDamage = this.doPowerDamage.bind(this);
      this.playerDamageDone = this.playerDamageDone.bind(this);
      this.doCombatLog = this.doCombatLog.bind(this);
      this.missTarget = this.missTarget.bind(this);
      this.enemyAttacks = this.enemyAttacks.bind(this);
      this.enemyDamageDone = this.enemyDamageDone.bind(this);
      this.leechHealth = this.leechHealth.bind(this);
      this.items = [];
      this.handleReloadClick = this.handleReloadClick.bind(this);

      this.state = {
         players: stats,
         health: stats[0].health,
         enemyhealth: stats[1].health,
         messages: [],
         seconds: 0,
         interval: 1000
      }
   }

   sum (x, y) {
      return x + y;
   }

   getFullName(ob) {
      return titleCase(ob.first) + " " + titleCase(ob.last);
   }

   getClassName(ob) {
      return titleCase(ob.classname);
   }

   getPlayerInfo(ob){
      return this.getFullName(ob) + ", " + this.getClassName(ob) + ' HP : ' + this.state.health;
   }

   getTargetInfo(ob){
      return this.getFullName(ob) + ", " + this.getClassName(ob) + ' HP : ' + this.state.enemyhealth;
   }

   missTarget(ob){
      return "misses " + this.getFullName(ob);
   }

   // Require PC and NPC
   enemyAttacks(pc, npc){
      return this.doWeaponDamage(npc) + ' on ' + this.getFullName(pc);
   }

   doWeaponDamage(ob) {
      return 'Attacks with ' + ob.weapon;
   }

   doPowerDamage(ob) {
      return 'Attacks with ' +ob.power;
   }

   playerDamageDone(pc) {
      let dmg = pc.weapondmg + pc.str + pc.powerdmg;
      this.setState({
         enemyhealth: stats[1].health - dmg
      });
      return "total damage: " + dmg.toString();
   }

   enemyDamageDone(npc) {
      let dmg = npc.weapondmg + npc.mag;
      this.setState({
         health: stats[0].health - dmg
      });
      return "total damage: " + dmg.toString();
   }

   leechHealth(pc, npc){
      let amount = pc.weapondmg;
      this.setState(prevState => ({
         health: prevState.health + amount
      }));
      return this.getFullName(pc) + " healed for " + amount.toString();
   }

   doCombatLog(seconds) {
      let players = this.state.players;
      // let res = players.filter(function(pc) {
      //    return pc.classname === "dragonknight";
      // });
      // let pc = res[0];
      // let targets = players.filter(function(target) {
      //    return target.classname === "sorcerer";
      // });
      let pc = players[0]
      let npc = players[1];

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
         }
      }
      const actions = [
         { text:this.getPlayerInfo(pc), style:styles.message },
         { text:this.doWeaponDamage(pc), style:styles.dmg },
         { text:this.doPowerDamage(pc), style:styles.dmg },
         { text:this.playerDamageDone(pc, npc), style:styles.dmg },
         { text:this.getTargetInfo(npc), style:styles.message },
         { text:this.enemyAttacks(pc, npc), style:styles.hit },
         { text:this.enemyDamageDone(npc), style:styles.hit },
         { text:this.getPlayerInfo(pc), style:styles.message },
         { text:this.leechHealth(pc, npc), style:styles.message },
         { text:this.getPlayerInfo(pc), style:styles.message },
         { text:'End of log', style:styles.miss }
      ];
      const concatItems = this.state.messages.concat(actions[seconds]);      
      // console.log(concatItems);
      return concatItems;
   }

   tick() {
      let timelimit = 11
      if(this.state.seconds < timelimit) {
         this.items = this.doCombatLog(this.state.seconds);
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds + 1
            // seconds: prevState.seconds + .5
         }));
      } else {
         this.setState(prevState => ({
            players: stats,
            messages: this.items,
            seconds: prevState.seconds
         }));
         clearInterval(this.interval);
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

   handleReloadClick(e){
      e.preventDefault();
      clearInterval(this.interval);
      this.setState({
         players: stats,
         health: stats[0].health,
         enemyhealth: stats[1].health,
         messages: [],
         seconds: 0,
         interval: 1000
      });
      this.componentDidMount();
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