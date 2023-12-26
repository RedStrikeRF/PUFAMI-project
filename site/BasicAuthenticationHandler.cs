using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;

namespace PUFAMI_Project;

internal class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock
    )
        : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        Response.Headers.Append("WWW-Authenticate", "Basic");

        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return Task.FromResult(AuthenticateResult.Fail("Authorization header missing."));
        }

        var authiruzationHeader = Request.Headers["Authorization"].ToString();
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
            new AuthenticationTicket(claimsPrincipal, Scheme.Name)));
    }
}