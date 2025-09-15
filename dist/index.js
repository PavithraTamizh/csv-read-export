"use strict";
// CSV Parser and Exporter
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportToCSV = void 0;
exports.parseCSV = parseCSV;
exports.exportCSV = exportCSV;
// Unified CSV parser
function parseCSV(csv, options) {
    const lines = csv.trim().split(/\r?\n/);
    if (lines.length === 0)
        return (options === null || options === void 0 ? void 0 : options.withHeaders) ? { headers: [], data: [] } : [];
    if (options === null || options === void 0 ? void 0 : options.withHeaders) {
        const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(value => value.trim().replace(/"/g, ''));
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }
        return { headers, data };
    }
    else {
        return lines.map(line => line.split(',').map(cell => cell.trim().replace(/"/g, '')));
    }
}
// Unified CSV exporter
function exportCSV(data, options) {
    let csvContent = '';
    if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
        // 2D array export
        csvContent = data
            .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
        if ((options === null || options === void 0 ? void 0 : options.browserDownload) && (options === null || options === void 0 ? void 0 : options.filename)) {
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
    else if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        // Array of objects export
        const propertyNames = (options === null || options === void 0 ? void 0 : options.propertyNames) || Object.keys(data[0]);
        const headers = (options === null || options === void 0 ? void 0 : options.displayHeaders) && options.displayHeaders.length === propertyNames.length
            ? options.displayHeaders
            : propertyNames;
        const csvRows = data.map(row => {
            const rowValues = propertyNames.map(property => {
                var _a;
                const value = (_a = row[property]) !== null && _a !== void 0 ? _a : "";
                return (value.toString().replace(/\n/g, "|"));
            });
            return rowValues.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(",");
        });
        csvContent = [headers.join(","), ...csvRows].join("\r\n");
        if ((options === null || options === void 0 ? void 0 : options.browserDownload) && (options === null || options === void 0 ? void 0 : options.filename)) {
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
const exportToCSV = (data, propertyNames, filename = "export.csv", displayHeaders) => {
    if (data.length === 0)
        return;
    // Use display headers if provided, otherwise use property names
    const headers = displayHeaders && displayHeaders.length === propertyNames.length
        ? displayHeaders
        : propertyNames;
    const csvRows = data.map(row => {
        const rowValues = propertyNames.map(property => {
            var _a;
            const value = (_a = row[property]) !== null && _a !== void 0 ? _a : "";
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
exports.exportToCSV = exportToCSV;
