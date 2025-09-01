import JSEncrypt from "jsencrypt"

const publicKeyPem = import.meta.env.VITE_SSH_PUBLIC_KEY?.replace(/\\n/g, '\n');
export function encryptMessage(message: string) {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKeyPem)
    const encrypted = encrypt.encrypt(message)
    if (!encrypted) throw new Error("Encryption failed")
    return encrypted
}
