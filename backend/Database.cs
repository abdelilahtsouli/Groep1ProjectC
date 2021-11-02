using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C_Website {
	public class Database {

		private Server server;
		private IConfiguration configuration = new ConfigurationBuilder()
				.AddJsonFile("appsettings.json", true, true)
				.Build();

		public Database() {
			this.server = new Server(this.configuration);
		}

		public QueryBuilder BuildQuery(string sql) {
			return new QueryBuilder(this.server.conn, sql);
		}
		public void Query(string sql) {
			NpgsqlCommand query = new NpgsqlCommand(sql, this.server.conn);
			query.ExecuteNonQuery();
		}
		

		public DataTable Select(string sql) {
			// Execute the query.
			NpgsqlCommand query = new NpgsqlCommand(sql, this.server.conn);
			query.Prepare();
			NpgsqlDataAdapter da = new NpgsqlDataAdapter(query);

			// Fill the datatable.
			DataTable dt = new DataTable();
			da.Fill(dt);

			return dt;
		}

		public void Close() {
			this.server.conn.Close();
		}
	}
	public class Server {

		public NpgsqlConnection conn;
		public Server(IConfiguration server) {
			string connstring = String.Format(
				server.GetSection("ConnectionStrings").GetSection("MyServer").Value
				);
			conn = new NpgsqlConnection(connstring);
			conn.Open();
		}
	}
	
	public class QueryBuilder {

		private NpgsqlCommand command;

		public QueryBuilder(NpgsqlConnection conn, string sql) {
			this.command = new NpgsqlCommand(sql, conn);
		}

		public QueryBuilder AddParameter(string key, object value) {
			this.command.Parameters.AddWithValue(key, value);

			return this;
		}

		public void Query() {
			this.command.ExecuteNonQuery();
		}

		public DataTable Select() {
			this.command.Prepare();
			NpgsqlDataAdapter da = new NpgsqlDataAdapter(command);

			// Fill the datatable.
			DataTable dt = new DataTable();
			da.Fill(dt);

			return dt;
		}

	}

}
