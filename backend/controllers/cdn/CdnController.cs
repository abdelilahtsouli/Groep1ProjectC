using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {
	[Route("/cdn")]
	[ApiController]
	public class CdnController : ControllerBase {

		// GET api/<CdnController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id) {
			Database database = new Database();
			DataTable data = database.Select("select * from media where media_id=" + id);

			foreach (DataRow row in data.Rows) {
				String file = row["file"].ToString();

				if (!System.IO.File.Exists(file)) {
					this.HttpContext.Response.StatusCode = 500;
					return Content(JsonSerializer.Serialize(new {
						message = "Image Not Found (doesn't exist on the disk)"
					}));
				}

				Byte[] b = System.IO.File.ReadAllBytes(file);
				// TODO: Support all image types.
				return File(b, "image/png");
			}

			this.HttpContext.Response.StatusCode = 404;
			return Content(JsonSerializer.Serialize(new {
				message = "Not Found"
			}));
		}

		// POST api/<CdnController>
		[HttpPost]
		public void Post([FromBody] string value) {
		}

		// PUT api/<CdnController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value) {
		}

		// DELETE api/<CdnController>/5
		[HttpDelete("{id}")]
		public void Delete(int id) {
		}
	}
}
