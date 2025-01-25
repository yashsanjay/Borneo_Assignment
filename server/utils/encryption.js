const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports.encrypt = (data) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
};

module.exports.decrypt = (encrypted, ivHex) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
