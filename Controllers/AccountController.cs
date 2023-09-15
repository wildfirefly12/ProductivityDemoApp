using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;

namespace Productivity.Controllers;

public class AccountController : BaseApiController
{
    private ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public AccountController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var user = new ApplicationUser
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest("Problem registering user.");
        }

        return Ok("Registration successful.");
    }
}