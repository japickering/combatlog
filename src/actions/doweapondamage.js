import getFullName from '../utils/getfullname';

function doWeaponDamage(ob) {
   return getFullName(ob) + ' attacks with ' + ob.weapon.name;
}
export default doWeaponDamage;