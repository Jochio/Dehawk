import pool from './dbConnect';
import { hashPassword } from '../middleware/authentication';


const createUserTable = `DROP TABLE IF EXISTS userTable CASCADE;
  CREATE TABLE userTable (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR (128) NOT NULL,
    lastName VARCHAR (128) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    address VARCHAR (128) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT (NOW()),
    isAdmin BOOLEAN NOT NULL DEFAULT (false),
    password VARCHAR (128) NOT NULL
)`;


const createParcelTable = `DROP TABLE IF EXISTS parcelTable;
    CREATE TABLE parcelTable (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) references userTable(user_id) on delete cascade,
    parcelContent VARCHAR (128) NOT NULL,
    price FLOAT (11) NOT NULL,
    trackingID CHARACTER VARYING(100) NOT NULL,
    weight FLOAT (11) NOT NULL,
    metric VARCHAR (20) NOT NULL,
    pickupLocation VARCHAR (128) NOT NULL,
    destination VARCHAR (128) NOT NULL,
    status CHARACTER VARYING(10) NOT NULL DEFAULT ('Pending'),
    receiver VARCHAR (128) NOT NULL,
    email VARCHAR (355) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    currentLocation VARCHAR (128) NOT NULL,
    sentOn TIMESTAMP NOT NULL DEFAULT (NOW()),
    deliveredOn VARCHAR
)`;

const sql = 'insert into userTable (firstName, lastName, email, address, phone, isAdmin, password) values ($1, $2, $3, $4, $5, $6, $7)';

const variables = ['Admin', 'gritdot', 'gritdot@gmail.com', 'Jupiter Road', '098064467788', 'true', hashPassword('admindot')];

const values = ['Bakky', 'jany', 'codegirls@gmail.com', 'Jupiter Road', '098064467788', 'false', hashPassword('janedot')];


async function createTables() {
  const users = await pool.query(createUserTable);
  try {
    console.log('user table created', users);
  } catch (error) {
    console.log('user table not created');
  }
  const parcels = await pool.query(createParcelTable);
  try {
    console.log('parcels table created', parcels);
  } catch (error) {
    console.log('parcel table not created');
  }
  const admin = await pool.query(sql, variables);
  try {
    console.log('Admin inserted', admin);
  } catch (error) {
    console.log('Admin insertion failed');
  }
  const user = await pool.query(sql, values);
  try {
    console.log('User inserted', user);
  } catch (error) {
    console.log('User insertion failed');
  }
}

// function createAdmin() {
//   const create = pool.query(sql, variables)
//     .then((result => console.log(`Admin account ${result.command}ED`)))
//     .catch((error) => {
//       console.log(error);
//     });
//   return create;
// }
// }

// const { defaultTables, createAdmin } = tableHandler;
createTables();
// createAdmin();
export default createTables;
