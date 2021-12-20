using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Data;
using Npgsql;
using Microsoft.Extensions.Primitives;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {
	[Route("api/pages")]
	[ApiController]
	public class ApiPagesController : ControllerBase {

		private JsonSerializerOptions jsonOptions = new JsonSerializerOptions() {
			WriteIndented = true
		};

		// GET: api/pages
		[HttpGet]
		public string Get() {
			List<Object> pages = new List<Object>();

			Database database = new Database();
			DataTable pagesData = database.BuildQuery("SELECT * FROM pages ORDER BY id").Select();

			foreach (DataRow row in pagesData.Rows) {
				pages.Add(new {
					Id = (int)row["id"],
					Name = row["name"].ToString()
				});
			}

			database.Close();
			return JsonSerializer.Serialize(pages, jsonOptions);
		}

		// GET api/pages/1
		[HttpGet("{id}")]
		public string Get(int id) {
			Database database = new Database();
			DataTable pagesData = database.BuildQuery("SELECT * FROM pages WHERE id=@id")
				.AddParameter("id", id)
				.Select();

			foreach (DataRow row in pagesData.Rows) {
				Object page = new {
					Success = true,
					Id = (int)row["id"],
					Name = row["name"].ToString(),
					Content = row["content"].ToString()
				};

				database.Close();
				return JsonSerializer.Serialize(page, jsonOptions);
			}

			database.Close();
			this.HttpContext.Response.StatusCode = 404;
			return JsonSerializer.Serialize(new {
				Success = false,
				Message = "Not Found"
			}, jsonOptions);
		}

		public bool isValidOauth(string token) {
			if (token == null) return false;

			Database database = new Database();
			DataTable data = database.BuildQuery("SELECT * FROM admins WHERE oauth_token=@token")
				.AddParameter("token", token)
				.Select();

			database.Close();
			return data.Rows.Count == 1;
		}

		// POST api/pages
		[HttpPost]
		public string Post([FromBody] JsonElement json) {
			// Authorization check
			StringValues oauth_token;
			Request.Headers.TryGetValue("Authorization", out oauth_token);
			if (!isValidOauth(oauth_token)) {
				return JsonSerializer.Serialize(new {
					Success = false,
					Message = "Invalid oauth token."
				});
			}

			string name = json.GetProperty("name").GetString();

			long timeInMs = DateTimeOffset.Now.ToUnixTimeMilliseconds();

			Database database = new Database();
			DataTable data = database.BuildQuery("INSERT INTO pages VALUES (default, @name, @created_at, @updated_at, @content) RETURNING id")
				.AddParameter("name", name)
				.AddParameter("created_at", timeInMs)
				.AddParameter("updated_at", timeInMs)
				.AddParameter("content", "")
				.Select();

			int id = -1;
			foreach (DataRow row in data.Rows) {
				id = int.Parse(row["id"].ToString());
			}

			database.Close();
			return JsonSerializer.Serialize(new {
				Success = true,
				Id = id
			}, jsonOptions);
		}

		// PUT api/pages/5
		[HttpPut("{id}")]
		public string Put(int id, [FromBody] JsonElement json) {
			// Authorization check
			StringValues oauth_token;
			Request.Headers.TryGetValue("Authorization", out oauth_token);
			if (!isValidOauth(oauth_token)) {
				return JsonSerializer.Serialize(new {
					Success = false,
					Message = "Invalid oauth token."
				});
			}

			string content = json.GetProperty("content").GetString();
			long timeInMs = DateTimeOffset.Now.ToUnixTimeMilliseconds();

			Database database = new Database();
			database.BuildQuery("UPDATE pages SET content=@content, updated_at=@updated_at where id=@id")
				.AddParameter("content", content)
				.AddParameter("updated_at", timeInMs)
				.AddParameter("id", id)
				.Query();

			database.Close();
			return JsonSerializer.Serialize(new {
				Success = true
			}, jsonOptions);
		}

		// DELETE api/pages/5
		[HttpDelete("{id}")]
		public string Delete(int id) {
			// Authorization check
			StringValues oauth_token;
			Request.Headers.TryGetValue("Authorization", out oauth_token);
			if (!isValidOauth(oauth_token)) {
				return JsonSerializer.Serialize(new {
					Success = false,
					Message = "Invalid oauth token."
				});
			}

			Database database = new Database();
			database.BuildQuery("DELETE FROM pages WHERE id=@id")
				.AddParameter("id", id)
				.Query();

			database.Close();
			return JsonSerializer.Serialize(new {
				Success = true
			}, jsonOptions);
		}
	}
}
