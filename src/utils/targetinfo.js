import getFullName from './getfullname';

function targetInfo(ob){
   return getFullName(ob) + ' HP : ' + ob.health.toString();
}
export default targetInfo;