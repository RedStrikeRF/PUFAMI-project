using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PUFAMI_Project.BLL.Exceptions;
using PUFAMI_Project.BLL.Models;
using PUFAMI_Project.BLL.Services;
using PUFAMI_Project.Data;
using System.ComponentModel;

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
            options.DefaultFileNames.Add("./welcome_page.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

            var studentRegistrationData = new StudentRegistrationData();
            var studentAuthenticationData = new StudentAuthenticationData();

            string jsonUsers = @"./wwwroot/JS/users.json";
            string jsonClasses = @"./wwwroot/JS/classes.json";

            app.Run(async (context) =>
            {
                context.Response.ContentType = "text/html; charset=utf-8";

                // если обращение идет по адресу "/postuser", получаем данные формы
                if (context.Request.Path == "/registration_list/postuser")
                {
                    var request = context.Request;
                    string body = await new System.IO.StreamReader(request.Body).ReadToEndAsync();
                    dynamic data = JObject.Parse(body);
                    var avatar = (string)data.avatar;
                    var password = (string)data.password;
                    var surname = (string)data.surname;
                    var name = (string)data.name;
                    var role = (string)data.role;
                    var email = (string)data.email;

                    try
                    {
                        string fileContent = File.ReadAllText(jsonUsers);
                        Dictionary<string, User> users = JsonConvert.DeserializeObject<Dictionary<string, User>>(fileContent);
                        User user = new User(avatar, password, surname, name, role, email);

                        context.Response.ContentType = "application/json";
                        var responseData = new
                        {
                            status = ""
                        };

                        if (!users.ContainsKey(email))
                        {
                            responseData = new
                            {
                                status = "success"
                            };
                        }
                        else
                        {
                            responseData = new
                            {
                                status = "failure"
                            };
                        }

                        string jsonResponse = JsonConvert.SerializeObject(responseData);

                        // Отправляем JSON в качестве ответа
                        context.Response.WriteAsync(jsonResponse);

                        users.Add(email, user);

                        string updatedJson = JsonConvert.SerializeObject(users, Formatting.Indented);

                        File.WriteAllText(jsonUsers, updatedJson);
                        GetEmail(email);
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
                if (context.Request.Path == "/update")
                {
                    var request = context.Request;
                    string body = await new System.IO.StreamReader(request.Body).ReadToEndAsync();
                    dynamic data = JObject.Parse(body);
                    var avatar = (string)data.avatar;
                    var password = (string)data.password;
                    var surname = (string)data.surname;
                    var name = (string)data.name;
                    var role = (string)data.role;
                    var email = (string)data.email;

                    try
                    {
                        string fileContent = File.ReadAllText(jsonUsers);
                        Dictionary<string, User> users = JsonConvert.DeserializeObject<Dictionary<string, User>>(fileContent);

                        if (users.ContainsKey(email))
                        {
                            users.Remove(email);
                            User user = new User(avatar, password, surname, name, role, email);
                            users.Add(email, user);

                            string updatedJson = JsonConvert.SerializeObject(users, Formatting.Indented);

                            File.WriteAllText(jsonUsers, updatedJson);
                        }
                        GetEmail(email);
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
                if (context.Request.Path == "/work_space/addclass")
                {
                    var request = context.Request;
                    string body = await new System.IO.StreamReader(request.Body).ReadToEndAsync();
                    dynamic data = JObject.Parse(body);
                    var id = (string)data.id;
                    var name = (string)data.name;
                    var graduate = (string)data.graduate;
                    var owner = (string)data.owner;
                    var structure = data.structure;
                    var subjectDict = new Dictionary<string, List<Subject>>();
                    var subjectList = new List<Subject>();
                    foreach (PropertyDescriptor propertyDescriptor in TypeDescriptor.GetProperties(structure))
                    {
                        object obj = propertyDescriptor.GetValue(structure);
                        subjectList.Add(obj as Subject);
                        subjectDict.Add(propertyDescriptor.Name, subjectList);
                    }

                    try
                    {
                        string fileContent = File.ReadAllText(jsonClasses);
                        Dictionary<string, Class> classes = JsonConvert.DeserializeObject<Dictionary<string, Class>>(fileContent);

                        Class newClass = new Class(name, graduate, owner, structure);

                        context.Response.ContentType = "application/json";
                        var responseData = new
                        {
                            status = ""
                        };

                        if (!classes.ContainsKey(id))
                        {
                            responseData = new
                            {
                                status = "success"
                            };
                        }
                        else
                        {
                            responseData = new
                            {
                                status = "failure"
                            };
                        }

                        string jsonResponse = JsonConvert.SerializeObject(responseData);

                        // Отправляем JSON в качестве ответа
                        context.Response.WriteAsync(jsonResponse);

                        classes.Add(id, newClass);

                        string updatedJson = JsonConvert.SerializeObject(classes, Formatting.Indented);

                        File.WriteAllText(jsonUsers, updatedJson);

                        GetEmail(name);
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
            });

            app.Run();
        }

        public static string GetEmail(string email)
        {
            return email;
        }
    }
}