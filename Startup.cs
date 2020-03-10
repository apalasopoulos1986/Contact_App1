using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contact_App.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Contact_App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<ContactAppContext>(cfg =>
            {
                cfg.UseSqlServer(Configuration.GetConnectionString("ContactAppConnectionString"));
            });
            services.AddTransient<ContactsSeeder>();
            services.AddScoped<IContactsRepository, ContactsRepository>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseNodeModules();
            app.UseRouting();

            app.UseAuthorization();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllers();
            //});
            app.UseEndpoints(cfg =>
            {
                cfg.MapControllerRoute("Fallback", "{controller}/{action}/{id?}",
                    new
                    {
                        controller = "App",
                        action = "Index"
                    });
            });
        }
    }
}
