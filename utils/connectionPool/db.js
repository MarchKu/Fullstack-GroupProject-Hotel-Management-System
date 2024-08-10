import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  host: process.env.SUPABASE_HOST,
  user: process.env.SUPABASE_USER,
  database: process.env.SUPABASE_DATABASE,
  password: process.env.SUPABASE_PASSWORD,
  port: process.env.SUPABASE_PORT,
});


export default connectionPool;
