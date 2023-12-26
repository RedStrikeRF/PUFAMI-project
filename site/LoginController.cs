using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace PUFAMI_Project;

[Controller]
public class LoginController : Controller
{
    [HttpGet("/login")]
    public Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        Response.Headers.Append("WWW-Authenticate", "Basic");

        if (!Request.Headers.TryGetValue("Authorization", out var header))
        {
            return Task.FromResult(AuthenticateResult.Fail("Authorization header missing."));
        }

        var authiruzationHeader = header.ToString();
        var authHeaderRegex = new Regex(@"Basic (.*)");

        if (!authHeaderRegex.IsMatch(authiruzationHeader))
        {
            return Task.FromResult(AuthenticateResult.Fail("Authorization code not format properly"));
        }

        var authBase64 = Encoding.UTF8.GetString(Convert.FromBase64String(authHeaderRegex.Replace(authiruzationHeader, "$1")));
        var authSplit = authBase64.Split(Convert.ToChar(":"), 2);
        var authUsername = authSplit[0];
        var authPassword = authSplit.Length > 1 ? authSplit[1] : throw new Exception("Unable to get password");

        if (authUsername == null || authPassword == null)
        {
            // Сделать проверку пользователя через бд
            return Task.FromResult(AuthenticateResult.Fail("The username or password is not correct"));
        }

        const string Issuer = "https://asd"; // Издатель токена - ваш сайт

        var claims = new List<Claim>() // Условно атрибуты пользователя
        {
            new Claim(ClaimTypes.Country, "Russia"),
        };

        var authenticatedUser = new AuthenticatedUser("BasicAuthentication", true, "user");
        var claimsIdetity = new ClaimsIdentity(authenticatedUser, claims);
        var claimsPrincipal = new ClaimsPrincipal(claimsIdetity);

        return Task.FromResult(AuthenticateResult.Success(
            new AuthenticationTicket(claimsPrincipal, "BasicAuthentication")));
    }
}