using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Project_C_Website.data {
	public class Media {

		public int Id { get; private set; }
		public string Type { get; private set; }
		public int Location { get; private set; }
		public string Content { get; private set; }

		// The File attribute is an internal value which should not be exposed in the api.
		[JsonIgnore]
		public string File { get; private set; }

		public Media(int id, string type, int location, String file, String content) {
			this.Id = id;
			this.Type = type;
			this.Location = location;
			this.File = file;
			this.Content = content;
		}

	}
}
