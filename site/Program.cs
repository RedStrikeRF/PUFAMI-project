using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using PUFAMI_Project.Data;

namespace PUFAMI_Project
{
    public class Program
    {
        private static string? _connectingString;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            _connectingString = builder.Configuration.GetConnectionString("DefaultConnection");
            ConfigureServices(builder.Services);

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            Configure(app);
            app.MapControllers();

            app.Run();
        }

        private static void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(_connectingString, ServerVersion.AutoDetect(_connectingString));
            });

            services.AddSwaggerGen();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", configure => { })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, configure => { });

            services.AddAuthorization(configure =>
            {
                configure.AddPolicy("BasicAuthentication",
                    new AuthorizationPolicyBuilder("BasicAuthentication")
                    .RequireAuthenticatedUser()
                    .Build());

                // Policy - права пользовател€. ћожно добавл€ть роли, типа разработчик, менеджер, учитель, ученик 
                configure.AddPolicy("TeacherOnly", policy => policy.RequireClaim("Permission", "Teacher")); // TeacherOnly доступно только дл€ пользователей с Claim [Permission] = Teacher
            });

            services.AddControllers();
        }

        private static void Configure(IApplicationBuilder app)
        {
            DefaultFilesOptions options = new();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("/html/welcome_page.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();

            app.Run(async (context) => await context.Response.WriteAsync("Hello World"));
        }
    }
}