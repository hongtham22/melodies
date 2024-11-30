import CryptoJS from 'crypto-js';

const secretKey = `${process.env.NEXT_PUBLIC_KEY_DECODE}`
const musicEndpoint = `${process.env.NEXT_PUBLIC_MUSIC_ENDPOINT}`
export const decrypt = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
        throw new Error('Decrypted data is empty or invalid');
    }

    try {
        return `${musicEndpoint}` + JSON.parse(decrypted);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        console.error("Decrypted data:", decrypted);
        return undefined;
    }
};