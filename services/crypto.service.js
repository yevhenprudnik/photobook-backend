import crypto from 'node:crypto';

/** @param {string} password */
export const hash = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');

  const hashed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return `${salt}:${hashed}`;
};

/**
 * @param {string} password
 * @param {string} passwordHash
 */
export const compare = (password, passwordHash) => {
  const [salt, hashed] = passwordHash.split(':');

  return (
    hashed ===
    crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  );
};
