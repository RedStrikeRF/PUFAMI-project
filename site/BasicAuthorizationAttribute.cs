
using Microsoft.AspNetCore.Authorization;

internal class BasicAuthorizationAttribute : AuthorizeAttribute
{
    public BasicAuthorizationAttribute()
    {
        Policy = "BasicAuthentication";
        AuthenticationSchemes = "BasicAuthentication";
    }
}