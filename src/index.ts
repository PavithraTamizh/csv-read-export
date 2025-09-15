// CSV Parser and Exporter


// Unified CSV parser
export function parseCSV(
  csv: string,
  options?: { withHeaders?: boolean }
): string[][] | { headers: string[]; data: any[] } {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length === 0) return options?.withHeaders ? { headers: [], data: [] } : [];

  if (options?.withHeaders) {
    const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
    const data: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim().replace(/"/g, ''));
      if (values.length === headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }
    return { headers, data };
  } else {
    return lines.map(line => line.split(',').map(cell => cell.trim().replace(/"/g, '')));
  }
}

// Unified CSV exporter
export function exportCSV(
  data: string[][] | any[],
  options?: {
    propertyNames?: string[];
    displayHeaders?: string[];
    filename?: string;
    browserDownload?: boolean;
  }
): string | void {
  let csvContent = '';
  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    // 2D array export
    csvContent = (data as string[][])
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    if (options?.browserDownload && options?.filename) {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = options.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
    return csvContent;
  } else if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    // Array of objects export
    const propertyNames = options?.propertyNames || Object.keys(data[0]);
    const headers = options?.displayHeaders && options.displayHeaders.length === propertyNames.length
      ? options.displayHeaders
      : propertyNames;
    const csvRows = (data as any[]).map(row => {
      const rowValues = propertyNames.map(property => {
        const value = row[property] ?? "";
        return (value.toString().replace(/\n/g, "|"));
      });
      return rowValues.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(",");
    });
    csvContent = [headers.join(","), ...csvRows].join("\r\n");
    if (options?.browserDownload && options?.filename) {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = options.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
    return csvContent;
  }
  return '';
}

// Export data to CSV file with custom header and row value mapping
export const exportToCSV = (
  data: any[],
  propertyNames: string[],
  filename: string = "export.csv",
  displayHeaders?: string[]
): void => {
  if (data.length === 0) return;

  // Use display headers if provided, otherwise use property names
  const headers = displayHeaders && displayHeaders.length === propertyNames.length
    ? displayHeaders
    : propertyNames;

  const csvRows = data.map(row => {
    const rowValues = propertyNames.map(property => {
      const value = row[property] ?? "";
      return (value.toString().replace(/\n/g, "|"));
    });

    return rowValues.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(",");
  });
  
  const csvContent = [headers.join(","), ...csvRows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
