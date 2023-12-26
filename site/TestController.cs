using Microsoft.AspNetCore.Mvc;

namespace PUFAMI_Project;

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