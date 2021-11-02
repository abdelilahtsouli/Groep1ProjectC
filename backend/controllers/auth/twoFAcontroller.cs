using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Project_C_Website.controllers;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {

	[Route("api/auth/2FA")]
	[ApiController]
	public class twoFAcontroller : ControllerBase {

		// POST api/auth/2FA
		[HttpPost]
		public string Post() {

			string secret = HttpContext.Request.Form["secretKey"];
			string email = HttpContext.Request.Form["email"];
			string id = (HttpContext.Request.Form["id"]);

			Database database = new Database();
			database.BuildQuery($"UPDATE td_user SET secret_key = @secret, twofa = TRUE WHERE id = @id")
				.AddParameter("secret", secret)
				.AddParameter("id", Int32.Parse(id))
				.Query();
			return JsonSerializer.Serialize(new{
				secret, email
			});
		}
	}
}