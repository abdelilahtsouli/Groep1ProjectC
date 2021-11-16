using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Project_C_Website.controllers;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Text;
using System.Runtime.Serialization.Formatters.Binary;
using System.Data;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {

	[Route("api/auth/login")]
	[ApiController]
	public class AuthController : ControllerBase {

		// POST api/auth/login
		[HttpPost]
		public string Post() {
			// Get a value called email & password from the Request 
			string email_input = HttpContext.Request.Form["email"];
			string password_input = HttpContext.Request.Form["password"];


			// Execute the query on the database.
			Database database = new Database();
			DataTable data = database.BuildQuery("select * from td_user").Select();
	
			// Loop through each row in the query and check if the details are correct.
			foreach (DataRow row in data.Rows) {
				var newPassword = password_input + row["salt"].ToString();
				var crypt = new SHA256Managed();
				byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(newPassword));
				string hash = Encoding.ASCII.GetString(crypto);

				if (row["email"].ToString() == email_input && row["password"].ToString() == hash) {

					return JsonSerializer.Serialize(new {
						id = Int32.Parse(row["id"].ToString()),
						email = email_input,
						twoFAenabled = bool.Parse(row["twofa"].ToString()),
						success = true
					});
				}
			}

			return JsonSerializer.Serialize(new{
				success = false,
				message = "Either the email or the password is incorrect"
			});
		}

	}
}