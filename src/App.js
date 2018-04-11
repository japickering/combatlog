import React from "react";

function titleCase(str) {
    return str.replace(/\w\S*/g, 
    function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

class App extends React.Component {

   constructor(props) {
      super(props);
      this.sum = this.sum.bind(this);
      this.getPlayers = this.getPlayers.bind(this);
      this.getFullName = this.getFullName.bind(this);
      this.getClassName = this.getClassName.bind(this);
      this.getTargetInfo = this.getTargetInfo.bind(this);
      this.doWeaponDamage = this.doWeaponDamage.bind(this);
      this.doPowerDamage = this.doPowerDamage.bind(this);
      this.totalDamageDone = this.totalDamageDone.bind(this);
      this.doCombatLog = this.doCombatLog.bind(this);
      this.missTarget = this.missTarget.bind(this);
      this.enemyAttacks = this.enemyAttacks.bind(this);
      this.items = [];
      this.handleReloadClick = this.handleReloadClick.bind(this);

      this.state = {
         players: this.getPlayers(),
         messages: [],
         seconds: 0
      }
   }

   sum (x, y) {
      return x + y;
   }

   getPlayers() {
      let arr = [
         {
            first: 'Jorvund',
            last: 'Greymane',
            classname: 'dragonknight',
            skill: 'flame',
            armour: 'heavy',
            weapon: 'greatsword',
            weapondmg: 10,
            attacks: 1,
            damagemultiplier: 2,
            power: 'standard of might',
            powerdmg: 1000
         },
         {
            first: 'Abnur',
            last: 'Tharn',
            classname: 'sorcerer',
            skill: 'destruction',
            armour: 'light',
            weapon: 'staff',
            weapondmg: 10,
            attacks: 1,
            damagemultiplier: 2,
            power: 'meteor',
            powerdmg: 1000
         }
      ];
      return arr;
   }

   getFullName(ob) {
      return titleCase(ob.first) + " " + titleCase(ob.last);
   }

   getClassName(ob) {
      return titleCase(ob.classname);
   }

   getTargetInfo(ob){
      return this.getFullName(ob) + ", " + this.getClassName(ob);
   }

   missTarget(ob){
      return "misses " + this.getFullName(ob);
   }

   doWeaponDamage(ob) {
      return 'Attacks with ' + ob.weapon + ' deals ' + ob.weapondmg.toString() + ' weapon dmg';
   }

   doPowerDamage(ob) {
      return 'Attacks with ' +ob.power + ' deals ' + ob.powerdmg.toString() + ' magic dmg';
   }

   totalDamageDone(ob) {
      return "Total damage done: " + this.sum(ob.weapondmg, ob.powerdmg);
   }

   // Require PC and NPC
   enemyAttacks(pc, npc){
      return this.doWeaponDamage(npc) + ' on ' + this.getFullName(pc);
   }

doCombatLog(seconds) {
   let players = this.state.players;
   let res = players.filter(function(pc) {
      // return pc.classname === "sorcerer";
      return pc.classname === "dragonknight";
   });
   let pc = res[0];
   let targets = players.filter(function(target) {
      return target.classname === "sorcerer";
   });
   let npc = targets[0];

   const styles = {
      message: {
         color: "#fff"
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
      { text:this.getFullName(pc), style:styles.message },
      { text:this.doWeaponDamage(pc), style:styles.dmg },
      { text:this.missTarget(npc), style:styles.miss },
      { text:this.totalDamageDone(pc), style:styles.dmg },
      { text:this.getFullName(npc), style:styles.message },
      { text:this.enemyAttacks(pc, npc), style:styles.hit },
      { text:'End of log', style:styles.message }
   ];
   const concatItems = this.state.messages.concat(actions[seconds]);
   // console.log(concatItems);
   return concatItems;
}

   tick() {
      let timelimit = 7
      if(this.state.seconds < timelimit) {
         this.items = this.doCombatLog(this.state.seconds);
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds + 1
            // seconds: prevState.seconds + .5
         }));
      } else {
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds
         }));
         clearInterval(this.interval);
      }
   }

   componentDidMount() {
      this.interval = setInterval(() => 
         this.tick(), 1000
      );
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   handleReloadClick(e){
      e.preventDefault();
      clearInterval(this.interval);
      this.setState({
         players: this.getPlayers(),
         messages: [],
         seconds: 0
      });
      this.interval = setInterval(() => 
         this.tick(), 1000
      );
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