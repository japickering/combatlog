import getFullName from '../utils/getFullName';

const kill = (ob) => {
   return getFullName(ob) + ' is dead';
}

const enemyDamage = (pc, npc) => {
   const amount = npc.weapon.damage + npc.power.damage;
   if(npc.health <= 0) {
      return getFullName(npc) + ' is dead';
   } else if (pc.health > 0){
      if(pc.health === pc.maxhealth){
         pc.health -= amount;
      } else {
         return 'total damage : ' + amount.toString();
      }
   } else {
      return kill(pc);
   }
}
export default enemyDamage;