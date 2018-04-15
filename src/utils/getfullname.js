import titleCase from './titlecase';

function getFullName(ob) {
   return titleCase(ob.first) + " " + titleCase(ob.last);
}
export default getFullName;