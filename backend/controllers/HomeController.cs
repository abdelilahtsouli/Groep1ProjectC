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
        public List<DataModel> Index()
        {
            DataModel list = new DataModel();

            string sql = "SELECT * FROM td_user";
            Database db = new Database(sql, this.server);
            Console.WriteLine(db.data.HasRows);
            if (db.data.HasRows)
            {
                while (db.data.Read())
                {
                    list.ListModel.Add(new DataModel
                    {
                        id = Convert.ToInt32(db.data[0]),
                        name = db.data[1].ToString(),
                        email = db.data[2].ToString(),
                        password = db.data[3].ToString()
                        
                    });
                }
                
            }
            
            

            
            db.Close();

            return list.ListModel;

        }
        public HomeController(IConfiguration server)
        {
            this.server = server;

        }

    }
}
