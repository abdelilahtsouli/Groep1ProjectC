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
using Google.Authenticator;
using System.Security.Cryptography;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers
{

	[Route("api/auth/2FAverify")]
	[ApiController]
	public class twoFAverify : ControllerBase
	{

		// POST api/auth/2FA
		[HttpPost]
		public string Post()
		{

			string secret = "";
			string token = HttpContext.Request.Form["token_input"];
			string id = (HttpContext.Request.Form["id"].ToString());
			string email = HttpContext.Request.Form["email"].ToString();
			string password = HttpContext.Request.Form["password"].ToString();
			string oauth_token = "";
			string superuser = "";
			Database database = new Database();
			DataTable data = database.BuildQuery("select secret_key,superuser from admins WHERE id = @id AND email=@email AND password=@password")
				.AddParameter("id", Int32.Parse(id))
				.AddParameter("email", email)
				.AddParameter("password",password)
				.Select();

			foreach (DataRow row in data.Rows)
			{
				secret = row["secret_key"].ToString();
				superuser = row["superuser"].ToString();
			}
			
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
			bool isCorrectPIN = tfa.ValidateTwoFactorPIN(secret, token, true);
			//Generate secret oauth token every time a user logs in.
			using(RandomNumberGenerator rng = new RNGCryptoServiceProvider())
			{
				byte[] tokenData = new byte[32];
				rng.GetBytes(tokenData);
				oauth_token = Convert.ToBase64String(tokenData);
			}
			//Update the oauth_token in the database.
			database.BuildQuery($"UPDATE admins SET oauth_token = @oauth_token WHERE id = @id AND email=@email AND password=@password")
				.AddParameter("oauth_token", oauth_token)
				.AddParameter("email", email)
				.AddParameter("password", password)
				.AddParameter("id", Int32.Parse(id))
				.Query();
			database.Close();
			if(isCorrectPIN){
				return JsonSerializer.Serialize(new
				{
					isCorrectPIN,
					token = oauth_token,
					error = "",
					superUser = superuser
				});
			}
			else{
				return JsonSerializer.Serialize(new{
					error = "De ingevoerde PIN is niet juist"
				});
			}

		}

	}
}