using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Project_C_Website.Models;
using Project_C_Website.controllers;
using Microsoft.Extensions.Configuration;
using System.IO;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project_C_Website.controllers
{
    [Route("api/auth/login")]
    [ApiController]

    public class AuthController : ControllerBase 
    {


        IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();

        // POST api/<Authcontroller>

        [HttpPost] 
        public string Post(){
            

            // Get a value called email & password from the Request 
            string email_input = HttpContext.Request.Form["email"];
            string password_input = HttpContext.Request.Form["password"];

            HomeController hm = new(config);
            List<DataModel> list = hm.Index();
            foreach (var model in list)
            {
                if (email_input == model.email.ToString() && password_input == model.password.ToString())
                {
                    return "Logged in succesfull";
                }
            }
            return "Either the email or the password is incorrect";
            


        }
    }
}