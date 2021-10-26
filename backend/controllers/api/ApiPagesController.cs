using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Project_C_Website.data;
using System.Text.Json;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {
	[Route("api/pages")]
	[ApiController]
	public class ApiPagesController : ControllerBase {

		private JsonSerializerOptions jsonOptions = new JsonSerializerOptions() {
			WriteIndented = true
		};

		private List<Media> getMediaOfPage(int page_id, Database database) {
			List<Media> media = new List<Media>();

			DataTable mediaOfPagesData = database.Select("select * from media_of_pages where page_id=" + page_id);
			foreach (DataRow row in mediaOfPagesData.Rows) {
				int media_id = (int)row["media_id"];
				int location = (int)row["location"];

				DataTable mediaData = database.Select("select * from media where media_id=" + media_id);
				foreach (DataRow mediaRow in mediaData.Rows) {
					media.Add(new Media(media_id, mediaRow["type"].ToString(), 
						location, mediaRow["file"].ToString(), mediaRow["content"].ToString()));
				}
			}

			return media;
		}

		// GET: api/pages
		[HttpGet]
		public string Get() {
			List<Page> pages = new List<Page>();

			Database database = new Database();
			DataTable pagesData = database.Select("select * from pages");

			foreach (DataRow row in pagesData.Rows) {
				int page_id = (int)row["id"];
				List<Media> mediaOfPage = getMediaOfPage(page_id, database);

				Page page = new Page(page_id, row["name"].ToString(), mediaOfPage);
				pages.Add(page);
			}

			JsonSerializerOptions jsonOptions = new JsonSerializerOptions() {
				WriteIndented=true
			};

			return JsonSerializer.Serialize(pages, jsonOptions);
		}

		// GET api/pages/1
		[HttpGet("{id}")]
		public string Get(int id) {
			Database database = new Database();
			DataTable pagesData = database.Select("select * from pages where id=" + id);

			foreach (DataRow row in pagesData.Rows) {
				List<Media> media = this.getMediaOfPage(id, database);
				Page page = new Page(id, row["name"].ToString(), media);

				return JsonSerializer.Serialize(page, jsonOptions);
			}

			this.HttpContext.Response.StatusCode = 404;
			return JsonSerializer.Serialize(new {
				message = "Not Found"
			});
		}

		// POST api/pages
		[HttpPost]
		public void Post([FromBody] string value) {
		}

		// PUT api/pages/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value) {
		}

		// DELETE api/pages/5
		[HttpDelete("{id}")]
		public void Delete(int id) {
		}
	}
}
