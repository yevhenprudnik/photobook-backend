import crypto from 'node:crypto';

/** @param {string} password */
export const hash = password => {
  const salt = crypto.randomBytes(16).toString('hex');

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return salt + ':' + hash;
};

/**
 * @param {string} password
 * @param {string} passwordHash
 */
export const compare = (password, passwordHash) => {
  const [salt, hash] = passwordHash.split(':');

  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
  );
};
