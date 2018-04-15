import getFullName from '../utils/getfullname';

function doPowerDamage(ob) {
   return getFullName(ob) + ' attacks with ' +ob.power.name;
}
export default doPowerDamage;