import forge from 'node-forge';
import JSEncrypt from 'jsencrypt';

// const publicKeyPem = import.meta.env.VITE_SSH_PUBLIC_KEY.replace(/\\n/g, '\n');
const publicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlDJBSWoZNREuXFHu8GaP
QJVXNdrx1JbDnISTj01i4F4YwlHJj8CjxqAbK5YoWW+RNjO4xcZNFMiRhOqexuGD
iY30QARC+WRkZ6sjFr7cbTqM9r9oMfIkGqzg0f06kFLwV77R7KtLu0QZAVzlNja2
oiMpeUURLysbeL3Sr19YOg6dBqu19ZiG1YFcWVBFpBlMZtaDobyv8S8vVYs4Omtt
GjqeXXJgIB09KT0jD3M1flBjgY+7EswkJx09Qbb7cPZrtOUJa61hGXdk/KLjVQD+
ntCo+RSiJrbLwJqtw+lOh0N6X/H2uu607/fvFjH9AcIeK6lsg2o6whykFvjnaHxe
vwIDAQAB
-----END PUBLIC KEY-----
`;

// export function encryptMessage(message: string): string {
//     console.log(publicKeyPem);

//     const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//     const encrypted = publicKey.encrypt(message, 'RSA-OAEP', {
//         md: forge.md.sha256.create(),
//     });
//     return forge.util.encode64(encrypted);
// }

export function encryptMessage(message: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKeyPem);
    const encrypted = encrypt.encrypt(message);
    if (!encrypted) throw new Error("Encryption failed");
    return encrypted;
}
