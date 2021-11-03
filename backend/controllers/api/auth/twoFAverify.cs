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
			string id = (HttpContext.Request.Form["id"]);

			Database database = new Database();
			DataTable data = database.BuildQuery("select secret_key from td_user WHERE id = @id")
				.AddParameter("id", Int32.Parse(id)).Select();
			foreach (DataRow row in data.Rows)
			{
				secret = row["secret_key"].ToString();
			}
			
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
			bool isCorrectPIN = tfa.ValidateTwoFactorPIN(secret, token, true);
			






			return JsonSerializer.Serialize(new
			{
				isCorrectPIN
			});
		}

	}
}