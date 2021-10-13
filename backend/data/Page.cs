using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Project_C_Website.data {
	public class Page {

		public int Id { get; private set; }
		public string Name { get; private set; }
		public Media[] Media { get; private set; }

		public Page(int id, string name, Media[] media) {
			this.Id = id;
			this.Name = name;
			this.Media = media;
		}

	}
}
