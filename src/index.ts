import { Client as MySqlClient } from './driver/mysql';
const mysql = new MySqlClient();

// import { Client as PgClient } from 'pg';

const getDataFromSql = async () => {
	const ovhSqlCred = {
		hostname: 'https://mysql.9m.wtf',
		db: 'demo',
		username: 'demo_user',
		password: 'demo_user_pass',
	};

	const connection = await mysql.connect(ovhSqlCred);

	const result = await connection.query('SELECT * FROM users');

	return { database: 'mysql', data: result };
};

// const getDataFromPostgres = async () => {
// 	const client = new PgClient({
// 		host: 'john.db.elephantsql.com',
// 		port: '5432',
// 		database: 'hzldgkxs',
// 		user: 'hzldgkxs',
// 		password: 'esI4A3zLYEI7S8wUaLuD57ldPHMb5q1n',
// 	});
// 	await client.connect();

// 	const result = await client.query({
// 		text: 'SELECT * FROM users',
// 	});
// 	return { database: 'postgres', data: result.rows };
// };

export default {
	async fetch(req, env, ctx) {
		// const data = await getDataFromPostgres();
		const data = await getDataFromSql();

		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json;charset=UTF-8' },
		});
	},
};
