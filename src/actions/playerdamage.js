import getFullName from '../utils/getfullname';

function kill(ob){
   return getFullName(ob) + ' is dead';
}

function playerDamage(pc, npc) {
   let amount = pc.weapon.damage + pc.power.damage;
   if(pc.health <= 0) {
      return getFullName(pc) + ' is dead';
   } else if (npc.health > 0){
      if(npc.health === npc.maxhealth){
         npc.health -= amount;
      } else {
         return 'total damage : ' + amount.toString();
      }
   } else {
      return kill(npc);
   }
}
export default playerDamage;