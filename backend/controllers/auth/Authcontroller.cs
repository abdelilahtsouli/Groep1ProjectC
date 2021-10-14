using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers
{
    [Route("api/auth/login")]
    [ApiController]

    public class AuthController : ControllerBase
    {

        // POST api/<Authcontroller>

        [HttpPost]
        public string Post(){

            // Get a value called email & password from the Request 
            string email = HttpContext.Request.Form["email"];
            string password = HttpContext.Request.Form["password"];
            
            if(email == "admin@admin.nl" && password == "admin")
            {
                return "Logged in succesful";
            }
            else
            {
                return "Either the email or the password is incorrect";
            }
            
        }
    }
}