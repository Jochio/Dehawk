import bcrypt from 'bcrypt';


const hashPassword = password => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

const verifyPassword = (prev, current) => bcrypt.compareSync(prev, current);

// EXAMPLE OF MINIMAL PROMISE CODE
// const hashPassword = password => {
//   const saltRounds = 10;
//   bcrypt
//     .hashSync(password, saltRounds)
//     .then(hash => hash)
//     // Store hash in your password DB.
//     .catch(err => (err.message));
// };

// EXAMPLE OF ASYNC MINIMAL
// const parcels = await bcrypt.hash(password,saltRounds);
// try {
//   return hash(password, 10)
// } catch (error) {
//   return error;
// }

export { hashPassword, verifyPassword };
