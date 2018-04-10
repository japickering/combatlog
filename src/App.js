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

   enemyAttacks(pc, npc){
      return this.doWeaponDamage(npc) + ' on ' + this.getFullName(pc);
   }

   doCombatLog(seconds) {
      let players = this.state.players;
      let items = this.state.messages

      // Get objects with matching player class names
      let res = players.filter(function(pc) {
         // return pc.classname === "sorcerer";
         return pc.classname === "dragonknight";
      });
      let pc = res[0];

      let targets = players.filter(function(npc) {
         return npc.classname === "sorcerer";
      });
      let oTarget = targets[0];


      // Simulate combat round
      switch(seconds){
         case 0:
            items.push(this.getFullName(pc) )
            break;
         case 1:
            items.push(this.doWeaponDamage(pc) + ' to ' + this.getFullName(oTarget) );
            break;
         case 2:
            items.push(this.missTarget(oTarget) );
            break;
         case 3:
            items.push(this.doPowerDamage(pc) + ' to ' + this.getFullName(oTarget) );
            break;
         case 4:
            items.push(this.totalDamageDone(pc) + ' to ' + this.getFullName(oTarget) );
            break;
         case 5:
            items.push(this.getFullName(oTarget) );
            break;
         case 6:
            items.push(this.enemyAttacks(pc, oTarget) );
            break;
         case 7:
            items.push("End log" );
            break;
         default:
            // 
      }
      return items;
   }

   tick() {
      let timelimit = 8
      if(this.state.seconds < timelimit) {
         this.items = this.doCombatLog(this.state.seconds);
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds + 1
         }));
      } else {
         this.setState(prevState => ({
            messages: this.items,
            seconds: prevState.seconds + 1
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

   render() {
      // console.log(this.state.messages);
      // let seconds = this.state.seconds;
      return (
         <main>
            <h1>Combat Log</h1>
            <div className="timer">
              <strong>Seconds:</strong> {this.state.seconds}
            </div>
            <div className="textbox">
               {this.state.messages.map(item => (
                  <p>{item}</p>
               ))}
            </div>
         </main>
      );
   }
}

export default App;