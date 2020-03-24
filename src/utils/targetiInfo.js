import getFullName from './getFullName';

const targetInfo = (ob) => {
   return getFullName(ob) + ' HP : ' + ob.health.toString();
}

export default targetInfo;