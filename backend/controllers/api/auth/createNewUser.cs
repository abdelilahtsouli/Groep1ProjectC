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
using System.Data;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {

	[Route("api/auth/createNewUser")]
	[ApiController]
	public class createNewUser : ControllerBase {

		// POST api/auth/login
		[HttpPost]
		public string Post() {
			// Get a value called email & password from the Request 
			string Name = HttpContext.Request.Form["Name"];
			string Email = HttpContext.Request.Form["Email"];
            string Password = HttpContext.Request.Form["Password"];
			string oauth = HttpContext.Request.Form["oauth"].ToString();
			bool superUser = false;
			
			if (Name == null || Email == null || Password == null){
				return JsonSerializer.Serialize(new{
					result = "Niet alle velden zijn correct ingevuld."
				});
			}

			// generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
			byte[] salt = new byte[128 / 8];
			using (var rngCsp = new RNGCryptoServiceProvider())
			{
				rngCsp.GetBytes(salt);
			}
			var newSalt =  Convert.ToBase64String(salt);

			var newPassword = Password + newSalt;

			var crypt = new SHA256Managed();
			byte[] crypto = crypt.ComputeHash(Encoding.ASCII.GetBytes(newPassword));
			string hash = Encoding.ASCII.GetString(crypto);

			

			

            Database database = new Database();
			//Query to check if the logged in user is authorithized to create new accounts
			DataTable data1 = database.BuildQuery("select superuser from admins WHERE oauth_token = @oauth_token")
				.AddParameter("oauth_token", oauth)
				.Select();
			foreach (DataRow row in data1.Rows){
				superUser = bool.Parse(row["superuser"].ToString());
			}

            //Query to insert the new users information into the database
			if(superUser){
				DataTable data = database.BuildQuery($"SELECT (id) FROM admins").Select();
				database.BuildQuery($"INSERT INTO admins (id, name, email, password, twofa, salt, superuser) VALUES (@id, @name, @email, @password, @twofa, @salt, @superuser)")
					.AddParameter("id", (data.Rows.Count + 1))
					.AddParameter("name", Name)
					.AddParameter("email", Email)
					.AddParameter("twofa", false)
					.AddParameter("superuser", superUser)
					.AddParameter("password", hash)
					.AddParameter("salt", newSalt)
					.Query();
			

				database.Close();
				return JsonSerializer.Serialize(new{
					userCreated = true,
					id = data.Rows.Count + 1
				});
			}
			database.Close();
			return JsonSerializer.Serialize(new{
				result = "U heeft geen rechten om een nieuw account aan te maken."
			});
		}
        
	}
}
