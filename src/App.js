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
      this.getPlayers = this.getPlayers.bind(this);
      this.getFullName = this.getFullName.bind(this);
      this.getClassName = this.getClassName.bind(this);
      this.useWeapon = this.useWeapon.bind(this);
      this.usePower = this.usePower.bind(this);
      this.doWeaponDamage = this.doWeaponDamage.bind(this);
      this.doPowerDamage = this.doPowerDamage.bind(this);
      this.totalDamageDone = this.totalDamageDone.bind(this);
      this.sum = this.sum.bind(this);
      this.doCombatLog = this.doCombatLog.bind(this);

      this.state = {
         players: this.getPlayers()
      }
   }

   sum (x, y) {
      return x + y;
   }

   getPlayers() {
      let arr = [
         {
            first: "Jorvund",
            last: "Greymane",
            classname: "dragonknight",
            skill: "flame",
            armour: "heavy",
            weapon: "greatsword",
            weapondmg: 10,
            numberofattacks: 1,
            damagemultiplier: 2,
            power: "standard of might",
            powerdmg: 1000
         },
         {
            first: "Abnur",
            last: "Tharn",
            classname: "sorcerer",
            skill: "destruction",
            armour: "light",
            weapon: "staff",
            weapondmg: 10,
            numberofattacks: 1,
            damagemultiplier: 2,
            power: "meteor",
            powerdmg: 1000
         }
      ];
      return arr;
   }

   getFullName(ob) {
      let str = titleCase(ob.first) + " " + titleCase(ob.last);
      return str;
   }

   getClassName(ob) {
      return titleCase(ob.classname);
   }

   useWeapon(ob) {
      return "uses " + ob.weapon;
   }

   usePower(ob) {
      return "uses " + ob.power;
   }

   doWeaponDamage(ob) {
      return 'Attacks with ' + ob.weapon + ' doing weapon damage: ' + ob.weapondmg;
   }

   doPowerDamage(ob) {
      return 'Attacks with ' +ob.power + ' doing magic damage: ' + ob.powerdmg;
   }

   totalDamageDone(ob) {
      return "Total damage done: " + this.sum(ob.weapondmg, ob.powerdmg);
   }

   doCombatLog() {
      let log = "";
      let players = this.state.players;
      let res = players.filter(function(el) {
         // return el.classname === "sorcerer";
         return el.classname === "dragonknight";
      });
      let ob = res[0];
      // console.log(ob);
      log = this.getFullName(ob) + ", ";
      log += this.getClassName(ob) + ":\n";
      log += this.doWeaponDamage(ob) + "\n";
      log += this.usePower(ob) + "\n";
      log += this.doPowerDamage(ob) + "\n";
      log += this.totalDamageDone(ob) + "\n";
      return log;
   }

   render() {
      let combatlog = this.doCombatLog();
      return (
         <main>
            <h1>Combat Log</h1>
            <form>
               <textarea value={combatlog}></textarea>
            </form>
         </main>
      );
   }
}

export default App;