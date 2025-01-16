export interface FileData {
    name: string;
    path: string;
    type: string;
}

export const testFiles: FileData[] = [
    { name: 'file.png', path: 'path/to/file.png', type: 'image/png' },
    { name: 'file.pdf', path: 'path/to/file.pdf', type: 'application/pdf' },
];