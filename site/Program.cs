using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using PUFAMI_Project.BLL.Exceptions;
using PUFAMI_Project.BLL.Models;
using PUFAMI_Project.BLL.Services;
using PUFAMI_Project.Data;

namespace PUFAMI_Project
{
    public class Program
    {
        public static StudentService studentService = new StudentService();

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectingString = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseMySql(connectingString, ServerVersion.AutoDetect(connectingString));
            });

            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", configure => { })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, configure => { });

            builder.Services.AddAuthorization(configure =>
            {
                configure.AddPolicy("BasicAuthentication",
                    new AuthorizationPolicyBuilder("BasicAuthentication")
                    .RequireAuthenticatedUser()
                    .Build());
            });

            builder.Services.AddControllers();


            //builder.Services.AddAuthorization(configure =>
            //{
            //    configure.
            //});

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            DefaultFilesOptions options = new();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("/welcome_page.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            var studentRegistrationData = new StudentRegistrationData();
            var studentAuthenticationData = new StudentAuthenticationData();

            app.Run(async (context) =>
            {
                context.Response.ContentType = "text/html; charset=utf-8";

                // ���� ��������� ���� �� ������ "/postuser", �������� ������ �����
                if (context.Request.Path == "/registration_list/postuser")
                {
                    var form = context.Request.Form;
                    studentRegistrationData.Email = form["email"];
                    studentRegistrationData.FirstName = form["firstname"];
                    studentRegistrationData.LastName = form["lastname"];
                    studentRegistrationData.Password = form["password"];

                    try
                    {
                        studentService.Register(studentRegistrationData);
                        await context.Response.SendFileAsync(@"./wwwroot/work_space/profile.html");
                    }
                    catch (ArgumentNullException)
                    {
                        throw new ArgumentNullException(nameof(studentRegistrationData));
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }
                if (context.Request.Path == "/getuser")
                {
                    var form = context.Request.Form;
                    studentAuthenticationData.Email = form["email"];
                    studentAuthenticationData.Password = form["password"];

                    try
                    {
                        Student student = studentService.Authenticate(studentAuthenticationData);
                        await context.Response.SendFileAsync(@"./wwwroot/work_space/profile.html");
                    }
                    catch (WrongPasswordException)
                    {
                        throw new WrongPasswordException();
                    }
                    catch (UserNotFoundException)
                    {
                        throw new UserNotFoundException();
                    }
                }
                else
                {
                    await context.Response.SendFileAsync(@"./wwwroot/registration_list/register_like_student.html");
                }
            });

            app.Run();
        }
    }
}