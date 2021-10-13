using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Project_C_Website.data;
using System.Text.Json;

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
			Page[] pages = new Page[] {
				new Page(1, "Homepage", new Media[] { 
					new Media(1, "image", 1, "image1.png"),
					new Media(2, "text", 2, "info_text.txt")
				}),
				new Page(2, "Bloedprikken", new Media[] { 
					new Media(1, "image", 1, "image1.png") 
				})
			};

			JsonSerializerOptions jsonOptions = new JsonSerializerOptions() {
				WriteIndented=true
			};

			return JsonSerializer.Serialize(pages, jsonOptions);
		}

		// GET api/pages/5
		[HttpGet("{id}")]
		public string Get(int id) {
			// Find the page in the database.
			Page page = new Page(1, "Homepage", new Media[] { new Media(1, "image", 1, "image1.png") });

			return JsonSerializer.Serialize(page, jsonOptions);
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
