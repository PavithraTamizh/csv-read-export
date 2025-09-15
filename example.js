import { parseCSV, exportCSV } from './src/index';

// Example: Parsing CSV to 2D array
const csvText = 'a,b,c\n1,2,3\n4,5,6';
const arrayResult = parseCSV(csvText);
console.log('2D Array:', arrayResult);

// Example: Parsing CSV with headers
const csvWithHeaders = 'name,age\nAlice,30\nBob,25';
const objectResult = parseCSV(csvWithHeaders, { withHeaders: true });
console.log('With Headers:', objectResult);

// Example: Exporting 2D array to CSV string
const arr = [
  ['a', 'b', 'c'],
  ['1', '2', '3'],
];
const csvString = exportCSV(arr);
console.log('CSV String from Array:', csvString);

// Example: Exporting array of objects to CSV string with custom headers
const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];
const csvObjString = exportCSV(data, {
  propertyNames: ['name', 'age'],
  displayHeaders: ['Full Name', 'Years'],
});
console.log('CSV String from Objects:', csvObjString);
