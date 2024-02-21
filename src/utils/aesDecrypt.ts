import crypto from 'crypto';
export function decryptStreamingLink(cipher: string) {
  const h51Key = "c3RhckBsaXZlZ2EqOTYzLg==";
  const h51Iv = "MDYwODA0MDMwNzAxMDUwMg==";
  const decipher = crypto.createDecipheriv("aes-128-cbc",Buffer.from(h51Key,'base64'), Buffer.from(h51Iv,'base64'))

  return Buffer.concat([
    decipher.update(Buffer.from(cipher,'base64')),
    decipher.final()
  ]).toString('utf-8')
}
