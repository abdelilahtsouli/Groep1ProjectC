using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C_Website.Models
{
    public class DataModel
    {
        public List<DataModel> ListModel = new List<DataModel>();

        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        
    }
}
