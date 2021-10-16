using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Project_C_Website.Models;



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
            string email_input = HttpContext.Request.Form["email"];
            string password_input = HttpContext.Request.Form["password"];

            if (email_input == DataModel.email || password_input == DataModel.password)
            {
                return "Logged in succesfull";
            }
            else
            {
                return "Either the email or the password is incorrect";
            }
        }
    }
}