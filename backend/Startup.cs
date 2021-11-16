using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Project_C_Website.controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_C_Website {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			services.AddControllers();
			services.AddSingleton<IConfiguration>(Configuration);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			} else {
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			app.UseHttpsRedirection();

			app.UseFileServer();

			app.UseRouting();

			app.UseEndpoints(endpoints => {
				endpoints.MapControllerRoute(
					name: "/api/",
					pattern: "pages",
					defaults: new ApiPagesController()
				);
				endpoints.MapControllerRoute(
					name: "/cdn/",
					pattern: "",
					defaults: new CdnController()
				);
				endpoints.MapControllerRoute(
					name: "/api/auth/",
					pattern: "login",
					defaults: new AuthController()
				);
				endpoints.MapControllerRoute(
					name: "/api/auth/",
					pattern: "2FA",
					defaults: new twoFAsetup()
				);
				endpoints.MapControllerRoute(
					name: "/api/auth/",
					pattern: "2FAverify",
					defaults: new twoFAverify()
				);
				endpoints.MapControllerRoute(
					name: "/api/auth/",
					pattern: "createNewUser",
					defaults: new createNewUser()
				);
			});
		}
	}
}
