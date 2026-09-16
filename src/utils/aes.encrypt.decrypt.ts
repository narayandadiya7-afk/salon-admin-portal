/**
 * Encrypt.decrypt.tsx
 * This Component is used to encrypt and decrypt passwords with a specific key.
 */
import CryptoJS from "crypto-js";

// The passkey is obtained from environment variables
const passkey = import.meta.env.VITE_PUBLIC_ENCRYPT_KEY || "";

export default class Aes {
  /**
   * Encrypts a message using AES encryption with a specific key.
   * @param {string} message - The message to be encrypted.
   * @param {string} passKey - The encryption key.
   * @returns {string} - The encrypted message.
   */
  static encrypt(message: string, passKey: string = passkey) {
    // Derive a key from the passKey using PBKDF2
    const keyBytes = CryptoJS.PBKDF2(passKey, "Ivan Medvedev", {
      keySize: 48 / 4,
      iterations: 1000,
    });

    // Extract 32 bytes for the key and 16 bytes for the initialization vector (iv)
    const key = new (CryptoJS.lib.WordArray as any).init(keyBytes.words, 32);
    const iv = new (CryptoJS.lib.WordArray as any).init(
      keyBytes.words.splice(32 / 4),
      16
    );

    // Convert the message to UTF-16LE format
    const data = CryptoJS.enc.Utf16LE.parse(message);

    // Encrypt the data using AES encryption
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });

    // Return the encrypted message as a string
    return encrypted.toString();
  }

  /**
   * Encodes a string value to Base64 format.
   * @param {string} value - The string value to be encoded.
   * @returns {CryptoJS.lib.WordArray} - The Base64-encoded value.
   */
  static encodeBase64(value: string) {
    return CryptoJS.enc.Base64.parse(value.toString());
  }

  /**
   * Decodes a Base64-encoded value to a string.
   * @param {any} encodedValue - The Base64-encoded value.
   * @returns {string} - The decoded string.
   */
  static decodeBase64(encodedValue: any) {
    // Parse the Base64-encoded value and convert to UTF-8 string
    const words = CryptoJS.enc.Base64.parse(encodedValue);
    return CryptoJS.enc.Utf8.stringify(words);
  }
}
