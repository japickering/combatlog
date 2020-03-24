import getFullName from '../utils/getFullName';

const powerDamage = (ob) => {
   return getFullName(ob) + ' attacks with ' +ob.power.name;
}

export default powerDamage;