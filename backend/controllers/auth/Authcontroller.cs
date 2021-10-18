using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Project_C_Website.Models;
using Project_C_Website.controllers;
using Microsoft.Extensions.Configuration;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers
{
    [Route("api/auth/login")]
    [ApiController]

    public class AuthController : ControllerBase 
    {

        public IConfiguration server;
  
        // POST api/<Authcontroller>

        [HttpPost]
        public string Post(){
            

            // Get a value called email & password from the Request 
            string email_input = HttpContext.Request.Form["email"];
            string password_input = HttpContext.Request.Form["password"];
            DataModel list = new DataModel();
            
            HomeController hm = new(server);
            hm.Index();
            if (email_input == list.email.ToString() || password_input == list.password.ToString())
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