using Microsoft.AspNetCore.Mvc;

[ApiController]
[BasicAuthorization]
public class TestController : Controller
{
    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok();
    }
}