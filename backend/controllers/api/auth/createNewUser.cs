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
			bool superUser = bool.Parse(HttpContext.Request.Form["Superuser"]);
			System.Console.WriteLine(superUser);
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

			


            //Query to insert the new users information into the database
            Database database = new Database();
			DataTable data = database.BuildQuery($"SELECT (id) FROM td_user").Select();
			
			database.BuildQuery($"INSERT INTO td_user (id, name, email,twofa,superuser, password, salt) VALUES (@id, @Name, @Email,@twofa,@superuser, @Password, @salt)")
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
				userCreated = true
			});
		}
		static string BytesToString(byte[] bytes)
		{
			using (MemoryStream stream = new MemoryStream(bytes))
			{
				using (StreamReader streamReader = new StreamReader(stream)) {
					return streamReader.ReadToEnd();
				}
			}
		}
        
	}
}