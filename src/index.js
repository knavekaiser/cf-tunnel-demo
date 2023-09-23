// import { Client as MySqlClient } from './driver/mysql';
// const mysql = new MySqlClient();

import { Client as PgClient } from 'pg';
// import { Client } from '@neondatabase/serverless';

// const getDataFromSql = async () => {
// 	const sqlCred = {
// 		hostname: 'sql12.freesqldatabase.com',
// 		port: '3306',
// 		db: 'sql12648414',
// 		username: 'sql12648414',
// 		password: 'dt8iKEcGu3',
// 	};

// 	const client = new mysql(sqlCred);
// 	await client.connect();

// 	const result = await client.query({
// 		text: 'SELECT * FROM users',
// 	});
// 	return { database: 'postgres', data: result.rows };
// };

const getDataFromPostgres = async () => {
	const postgresCred = {
		host: 'john.db.elephantsql.com',
		port: '5432',
		db: 'hzldgkxs',
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
