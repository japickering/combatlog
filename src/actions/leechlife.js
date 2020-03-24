import getFullName from '../utils/getFullName';

const leechLife = (pc) => {
   const amount = pc.weapon.damage;
   if(pc.health < pc.maxhealth){
      if(pc.healed){
         return getFullName(pc) + ' healed for ' + amount.toString();
      } else {
         pc.health += amount;
         pc.healed = true;
      }
   } else {
      return getFullName(pc) + ' at full health';
   }
}
export default leechLife;