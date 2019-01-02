const createUser = 'insert into userTable (firstName, lastName, email, password) values ($1, $2, $3, $4) returning *';

const queryUsersByEmail = 'select * from userTable where email = $1';

export { createUser, queryUsersByEmail };
