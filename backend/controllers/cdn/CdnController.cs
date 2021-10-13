using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers {
	[Route("/cdn")]
	[ApiController]
	public class CdnController : ControllerBase {

		// GET api/<CdnController>/5
		[HttpGet("{id}")]
		public string Get(int id) {
			String[] tempCdnContext = new string[] {
				"Dit is het eerste media dingetjes!",
				"Dit is nog een tekst ding!"
			};

			if (id > 0 && id < 3) return tempCdnContext[(id - 1)];

			this.HttpContext.Response.StatusCode = 404;
			return JsonSerializer.Serialize(new {
				message = "Not Found"
			});
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
