export function u8aToString(fileData: any) {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
}
