import getFullName from '../utils/getfullname';

function leechLife(pc){
   let amount = pc.weapon.damage;
   if(pc.health < pc.maxhealth){
      pc.health += amount;
      return getFullName(pc) + ' healed for ' + amount.toString();
   } else {
      return getFullName(pc) + ' at full health';
   }
}
export default leechLife;