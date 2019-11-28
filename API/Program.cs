using System.Threading;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host=CreateHostBuilder(args).Build();
            using(var scope=host.Services.CreateScope()){
                var services=scope.ServiceProvider;
                try{
                    var context=services.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                }
                catch(Exception ex){
                    var logger=services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex,"Error occurs during migration");
                }
            }
            
            host.Run();
            
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) => 
            Host.CreateDefaultBuilder()
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.UseStartup<Startup>();
            });
        
    }
}