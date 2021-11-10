﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Project_C_Website.data;
using System.Text.Json;
using System.Data;
using Npgsql;

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
			DataTable pagesData = database.BuildQuery("select * from pages").Select();

			foreach (DataRow row in pagesData.Rows) {
				pages.Add(new {
					Id = (int)row["id"],
					Name = row["name"].ToString()
				});
			}

			return JsonSerializer.Serialize(pages, jsonOptions);
		}

		// GET api/pages/1
		[HttpGet("{id}")]
		public string Get(int id) {
			Database database = new Database();
			DataTable pagesData = database.BuildQuery("select * from pages where id=@id")
				.AddParameter("id", id)
				.Select();

			foreach (DataRow row in pagesData.Rows) {
				Object page = new {
					Success = true,
					Id = (int)row["id"],
					Name = row["name"].ToString(),
					Content = row["content"].ToString()
				};

				return JsonSerializer.Serialize(page, jsonOptions);
			}

			this.HttpContext.Response.StatusCode = 404;
			return JsonSerializer.Serialize(new {
				Success = false,
				Message = "Not Found"
			}, jsonOptions);
		}

		// POST api/pages
		[HttpPost]
		public string Post([FromBody] JsonElement json) {
			string name = json.GetProperty("name").GetString();
			string content = json.GetProperty("content").GetString();

			long timeInMs = DateTimeOffset.Now.ToUnixTimeMilliseconds();

			Database database = new Database();
			database.BuildQuery("insert into pages values (default, @name, @created_at, @updated_at, @content)")
				.AddParameter("name", name)
				.AddParameter("created_at", timeInMs)
				.AddParameter("updated_at", timeInMs)
				.AddParameter("content", content)
				.Query();

			return JsonSerializer.Serialize(new {
				Success = true
			}, jsonOptions);
		}

		// PUT api/pages/5
		[HttpPut("{id}")]
		public string Put(int id, [FromBody] JsonElement json) {
			string content = json.GetProperty("content").GetString();
			long timeInMs = DateTimeOffset.Now.ToUnixTimeMilliseconds();

			Database database = new Database();
			database.BuildQuery("update pages set content=@content, updated_at=@updated_at where id=@id")
				.AddParameter("content", content)
				.AddParameter("updated_at", timeInMs)
				.AddParameter("id", id)
				.Query();

			return JsonSerializer.Serialize(new {
				Success = true
			}, jsonOptions);
		}

		// DELETE api/pages/5
		[HttpDelete("{id}")]
		public string Delete(int id) {
			Database database = new Database();
			database.BuildQuery("delete from pages where id=@id")
				.AddParameter("id", id)
				.Query();

			return JsonSerializer.Serialize(new {
				Success = true
			}, jsonOptions);
		}
	}
}
