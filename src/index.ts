// CSV Parser and Exporter

export function parseCSV(csv: string): string[][] {
  return csv.trim().split(/\r?\n/).map(line => line.split(','));
}

export function exportCSV(data: string[][]): string {
  return data.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}` ).join(',')).join('\n');
}
