import getFullName from '../utils/getFullName';

const weaponDamage = (ob) => {
   return getFullName(ob) + ' attacks with ' + ob.weapon.name;
}

export default weaponDamage;