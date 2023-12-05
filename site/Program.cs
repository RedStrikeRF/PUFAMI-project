using Microsoft.EntityFrameworkCore;
using PUFAMI_Project.Data;

namespace PUFAMI_Project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectingString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(connectingString, ServerVersion.AutoDetect(connectingString));
            });

            var app = builder.Build();

            DefaultFilesOptions options = new();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("/html/main_page.html");

            app.UseDefaultFiles(options);
            app.UseStaticFiles();

            app.Run(async (context) => await context.Response.WriteAsync("Hello World"));

            app.Run();
        }
    }
}