using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Project_C_Website.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C_Website.controllers
{
    public class HomeController : Controller
    {
        
        public IConfiguration server;
        public IActionResult Index()
        {
            DataModel list = new DataModel();

            String sql = "SELECT  * FROM td_user";
            Database db = new Database(sql, this.server);
            if (db.data.HasRows)
            {
                while (db.data.Read())
                {
                    list.ListModel.Add(new DataModel
                    {
                        name = db.data[1].ToString(),
                        email = db.data[2].ToString(),
                        password = db.data[3].ToString()
                    });
                }
            }
       

            return View();

        }
        public HomeController(IConfiguration server)
        {
            this.server = server;

        }
    }
}
