import * as pg from "pg";

const { Pool } = pg.default;

const connectionPool = new Pool({
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  user: "postgres.mxhmryetxradarukkhgs",
  database: "postgres",
  password: "Fsd6-teal-neatly",
  port: "6543",
});

export default connectionPool;
