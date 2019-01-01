// "test:dev": "cross-env NODE_ENV=test babel-node -- ./server/db/tables
// && cross-env NODE_ENV=test nyc --reporter=html --reporter=text mocha server/tests/*.js --exit
//  --compilers js:babel-core/register"
// THE ABOVE LINE in package.json WILL BE USED BY ONLINE TEST FRAMEWORKS USED IN THIS PROJECT
import { Pool } from 'pg';
import dotenv from 'dotenv';

// include an OR statement if you switch between a local dev db and
// a remote heroku environment
// 'postgresql://postgres:password@localhost:localpostgresport/yourlocaldbname'
dotenv.config();
let dbUrl;

if (process.env.NODE_ENV === 'test:dev') {
  dbUrl = {
    connectionString: process.env.TESTDB_URL
  };
} else {
  dbUrl = ({
    connectionString: process.env.DATABASE_URL || process.env.LOCALDB_URL,
    // SSL connections are required to connect Heroku Postgres
    ssl: true,
  });
}

const pool = new Pool(dbUrl);

export default pool;
