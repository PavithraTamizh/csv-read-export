# csv-read-export

A minimal CSV parser and exporter library for Node.js and browser environments.

## Features
- Parse CSV strings to arrays/objects
- Export arrays/objects to CSV format


## Usage

```js
import { parseCSV, exportCSV } from 'csv-read-export';

// Parse CSV to 2D array
const arrayResult = parseCSV('a,b,c\n1,2,3\n4,5,6');
// arrayResult: [['a', 'b', 'c'], ['1', '2', '3'], ['4', '5', '6']]

// Parse CSV with headers
const objectResult = parseCSV('name,age\nAlice,30\nBob,25', { withHeaders: true });
// objectResult: { headers: ['name', 'age'], data: [{ name: 'Alice', age: '30' }, { name: 'Bob', age: '25' }] }

// Export 2D array to CSV string
const arr = [
	['a', 'b', 'c'],
	['1', '2', '3'],
];
const csvString = exportCSV(arr);
// csvString: '"a","b","c"\n"1","2","3"'

// Export array of objects to CSV string with custom headers
const data = [
	{ name: 'Alice', age: 30 },
	{ name: 'Bob', age: 25 },
];
const csvObjString = exportCSV(data, {
	propertyNames: ['name', 'age'],
	displayHeaders: ['Full Name', 'Years'],
});
// csvObjString: 'Full Name,Years\r\n"Alice","30"\r\n"Bob","25"'
```

## Publishing
- Ensure you have built the project (`npm run build`).
- Run `npm publish` to publish to npm.

## License
MIT
