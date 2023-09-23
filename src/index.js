// import { Client as MySqlClient } from './driver/mysql';
// const mysql = new MySqlClient();

const mysql = require('mysql2/promise');
import { Client as PgClient } from 'pg';
// import { Client } from '@neondatabase/serverless';

const getDataFromSql = async () => {
	const sqlCred = {
		host: 'sql12.freesqldatabase.com',
		// port: '3306',
		database: 'sql12648414',
		user: 'sql12648414',
		password: 'dt8iKEcGu3',
	};

	const connection = await mysql.createConnection(sqlCred);

	const result = await connection.query('SELECT * FROM users');

	return { database: 'mysql', data: result, message: err.message };
};

const getDataFromPostgres = async () => {
	const postgresCred = {
		host: 'john.db.elephantsql.com',
		port: '5432',
		database: 'hzldgkxs',
		user: 'hzldgkxs',
		password: 'esI4A3zLYEI7S8wUaLuD57ldPHMb5q1n',
	};

	const client = new PgClient(postgresCred);
	await client.connect();

	const result = await client.query({
		text: 'SELECT * FROM users',
	});
	return { database: 'postgres', data: result.rows };
};

export default {
	async fetch(req, env, ctx) {
		const data = await getDataFromPostgres();
		// const data = await getDataFromSql();

		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json;charset=UTF-8' },
		});
	},
};
