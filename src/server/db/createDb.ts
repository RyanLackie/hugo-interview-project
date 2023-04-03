import mysql2, { QueryError, RowDataPacket }from "mysql2";
import * as dotenv from "dotenv";

dotenv.config();

const connection = mysql2.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PWD
});

connection.query("CREATE DATABASE hugodb", function(err: QueryError, results: RowDataPacket) {
	if (err)
		console.log(err);
	else
  		console.log(results);
});
