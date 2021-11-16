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

			// generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
			byte[] salt = new byte[128 / 8];
			using (var rngCsp = new RNGCryptoServiceProvider())
			{
				rngCsp.GetNonZeroBytes(salt);
			}
			string newSalt =  Encoding.ASCII.GetString(salt);
			// derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: Password,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA256,
				iterationCount: 100000,
				numBytesRequested: 256 / 8));
				
			Console.WriteLine(hashed);
			


            //Query to insert the new users information into the database
            Database database = new Database();
			DataTable data = database.BuildQuery($"SELECT (id) FROM td_user").Select();
			
			database.BuildQuery($"INSERT INTO td_user (id, name, email, password, salt) VALUES (@id, @Name, @Email, @Password, @salt)")
				.AddParameter("id", (data.Rows.Count + 1))
			    .AddParameter("name", Name)
                .AddParameter("email", Email)
                .AddParameter("password", hashed)
                .AddParameter("salt", newSalt)
                .Query();

            return JsonSerializer.Serialize(new{
				userCreated = true
			});
		}
        
	}
}