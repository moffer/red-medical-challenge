import { readFileSync } from 'fs';
import crypto = require('crypto');


const aes256gcm = (key: Buffer) => {
    const ALGO = 'aes-256-gcm';
      // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
    const decrypt = (enc, iv: Buffer, authTag: Buffer) => {
      const decipher = crypto.createDecipheriv(ALGO, key, iv);
      decipher.setAuthTag(authTag);
      let str = decipher.update(enc, 'base64', 'utf8');
      str += decipher.final('hex');
      return str;
    };
  
    return {
      decrypt
    };
  };

const secretKey = readFileSync('./secret.key', 'utf8') // "3e95f53a2e0bc1495dc266973eaba8767f53b3f916bc1d94d7c67dabcc5a0dd1";
const iv = readFileSync('./iv.txt');
const auth = readFileSync('./auth.txt');
  
const readKey = new Buffer(secretKey, 'hex');

const aesCipher = aes256gcm(readKey);
const encryptedFileContent = readFileSync('./secret.enc');
const encryptedFileContentString = encryptedFileContent;


// Sadly, decryption does not work, because it can not validate the data (Unsupported state or unable to authenticate data)
// My guess is, that reading from files into buffers has some problems with encoding.

// const decriptedContent = aesCipher.decrypt(encryptedFileContentString, iv, auth);
