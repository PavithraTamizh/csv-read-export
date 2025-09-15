export declare function parseCSV(csv: string, options?: {
    withHeaders?: boolean;
}): string[][] | {
    headers: string[];
    data: any[];
};
export declare function exportCSV(data: string[][] | any[], options?: {
    propertyNames?: string[];
    displayHeaders?: string[];
    filename?: string;
    browserDownload?: boolean;
}): string | void;
export declare const exportToCSV: (data: any[], propertyNames: string[], filename?: string, displayHeaders?: string[]) => void;
