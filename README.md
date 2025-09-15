# csv-read-export

A minimal CSV parser and exporter library for Node.js and browser environments.

## Features
- Parse CSV strings to arrays/objects
- Export arrays/objects to CSV format

## Usage

```js
import { parseCSV, exportCSV } from 'csv-read-export';

const data = parseCSV('a,b,c\n1,2,3');
const csv = exportCSV(data);
```

## Publishing
- Ensure you have built the project (`npm run build`).
- Run `npm publish` to publish to npm.

## License
MIT
