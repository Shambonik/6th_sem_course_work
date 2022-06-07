export interface FileData {
    src: string;
    name: string;
    type: string;
}

export const readFilesAsDataURL = async (
    arrFiles: File[],
): Promise<FileData[]> => {
    return new Promise((resolve) => {
        const arrResults: (string | ArrayBuffer | null)[] = [];

        if (arrFiles.length === 0) {
            return resolve([]);
        }

        arrFiles.forEach(file => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                arrResults.push(reader.result);

                if (arrResults.length === arrFiles.length) {
                    const filesData = arrResults.filter(data => !!data) as string[];

                    return resolve(
                        filesData.map((dataUrl, i) => ({
                            src: dataUrl,
                            name: arrFiles[i].name,
                            type: arrFiles[i].type
                        }))
                    );
                }
            };
        });
    });
};
