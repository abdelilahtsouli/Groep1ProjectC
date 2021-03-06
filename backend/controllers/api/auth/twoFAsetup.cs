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

namespace Project_C_Website.controllers {

	[Route("api/auth/2FA")]
	[ApiController]
	public class twoFAsetup : ControllerBase {

		// POST api/auth/2FA
		[HttpPost]
		public string Post() {


			string email = HttpContext.Request.Form["email"];
			string id = HttpContext.Request.Form["id"].ToString();
			string password = HttpContext.Request.Form["password"].ToString();
			if(email == null && id == null && password == null){
				return JsonSerializer.Serialize(new{
					succes = false
				});
			}
			TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
			Random random = new Random();

			int length = 30;
			var rString = "";
			for (var i = 0; i < length; i++)
			{
				rString += ((char)(random.Next(1, 26) + 64)).ToString();
			}
			var setupInfo = tfa.GenerateSetupCode("star-shl", email, rString, true);

			string qrCodeImageUrl = setupInfo.QrCodeSetupImageUrl;
			string qrCodeManual = setupInfo.ManualEntryKey;



			Database database = new Database();
			database.BuildQuery($"UPDATE admins SET secret_key = @secret, twofa = @twofa WHERE email = @email AND password=@password")
				.AddParameter("twofa", true)
				.AddParameter("secret", rString)
				.AddParameter("email", email)
				.AddParameter("password", password)
				.Query();

			database.Close();
			return JsonSerializer.Serialize(new{
				qrCodeImageUrl,
				qrCodeManual
			});
		}

	}
}