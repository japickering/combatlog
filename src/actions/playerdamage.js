import getFullName from '../utils/getFullName';

const kill = (ob) => {
   return getFullName(ob) + ' is dead';
}

const playerDamage = (pc, npc) => {
   const amount = pc.weapon.damage + pc.power.damage;
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