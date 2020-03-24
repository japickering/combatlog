import titleCase from './titleCase';

const getFullName = (ob) => {
   return titleCase(ob.first) + " " + titleCase(ob.last);
}
export default getFullName;