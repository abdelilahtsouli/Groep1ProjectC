using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C_Website
{
    public class Database
    {
        public Server server;
        private string sql;
        public NpgsqlDataReader data;
        public Database(string sql, IConfiguration server)
        {
            this.sql = sql;
            this.server = new Server(server);
            NpgsqlCommand query = new NpgsqlCommand(sql, this.server.conn);
            data = query.ExecuteReader();
        }
    }
    public class Server
    {
        public NpgsqlConnection conn;
        public Server(IConfiguration server)
        {
            string connstring = String.Format(
                server.GetSection("ConnectionString").GetSection("MyServer").Value
                );
            conn = new NpgsqlConnection(connstring);
            conn.Open();
        }
    }
}
