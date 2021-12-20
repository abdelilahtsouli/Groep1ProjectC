using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {
	[Route("/cdn")]
	[ApiController]
	public class CdnController : ControllerBase {

		private string getFilePath(string id) {
			return "./assets/" + id;
		}

		// GET cdn/1
		[HttpGet("{id}")]
		public IActionResult Get(int id) {
			Database database = new Database();

			DataTable data = database.BuildQuery("SELECT * FROM media WHERE media_id=@id")
				.AddParameter("id", id)
				.Select();

			foreach (DataRow row in data.Rows) {
				string file = getFilePath(row["media_id"].ToString());
				string type = row["type"].ToString();

				if (!System.IO.File.Exists(file)) {
					database.Close();

					this.HttpContext.Response.StatusCode = 500;
					return Content(JsonSerializer.Serialize(new {
						Success = false,
						Message = "File Not Found (doesn't exist on the disk)"
					}));
				}

				Byte[] b = System.IO.File.ReadAllBytes(file);
				return File(b, type);
			}

			database.Close();

			this.HttpContext.Response.StatusCode = 404;
			return Content(JsonSerializer.Serialize(new {
				Success = false,
				Message = "Not Found"
			}));
		}

		private bool isValidOauth(string token) {
			if (token == null) return false;

			Database database = new Database();
			DataTable data = database.BuildQuery("SELECT * FROM admins WHERE oauth_token=@token")
				.AddParameter("token", token)
				.Select();

			database.Close();

			return data.Rows.Count == 1;
		}

		// POST /cdn/
		[HttpPost]
		public ActionResult Post() {
			// Authorization check
			StringValues oauth_token;
			Request.Headers.TryGetValue("Authorization", out oauth_token);
			if (!isValidOauth(oauth_token)) {
				BadRequest(new {
					Success = false,
					Message = "Invalid oauth token."
				});
			}

			var file = Request.Form.Files[0];
			string type = file.ContentType;

			if (file.Length == 0) {
				return BadRequest(new {
					Success = false,
					Message = "Invalid file."
				});
			}

			// Make sure the file is not larger then 10mb.
			if (file.Length > 1000000 * 10) {
				return BadRequest(new {
					Success = false,
					Message = "The file is too large."
				});
			}

			// Add the media to the database.
			Database database = new Database();
			DataTable data = database.BuildQuery("INSERT INTO media VALUES (default, @type) RETURNING media_id")
				.AddParameter("type", type)
				.Select();

			int id = -1;
			foreach (DataRow row in data.Rows) {
				id = int.Parse((row["media_id"].ToString()));
			}

			using (var stream = new FileStream(getFilePath(id.ToString()), FileMode.Create)) {
				file.CopyTo(stream);
			}

			database.Close();

			return Ok(new {
				Success = true,
				Id = id,
			});
		}

		// DELETE /cdn/
		[HttpDelete("{id}")]
		public ActionResult Delete(int id) {
			// Authorization check
			StringValues oauth_token;
			Request.Headers.TryGetValue("Authorization", out oauth_token);
			if (!isValidOauth(oauth_token)) {
				return BadRequest(new {
					Success = false,
					Message = "Invalid oauth token."
				});
			}

			Database database = new Database();

			database.BuildQuery("DELETE FROM media WHERE media_id=@id")
				.AddParameter("id", id)
				.Query();

			database.Close();

			string file = getFilePath(id.ToString());
			System.IO.File.Delete(file);

			return Ok();
		}
	}
}
