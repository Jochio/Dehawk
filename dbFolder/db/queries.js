const insertUser = 'insert into userTable (firstName, lastName, email,address, phone, password) values ($1, $2, $3, $4, $5, $6) returning *';

const queryUsersByEmail = 'select * from userTable where email = $1';

export { insertUser, queryUsersByEmail };
