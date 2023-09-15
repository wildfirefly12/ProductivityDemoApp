using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Controllers
{

    public class CategoriesController : BaseApiController
    {
        private ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> CategoriesByUser(string id)
        {
            List<Category> categories = await _context.Categories
                .Where(category => category.UserId == id)
                .ToListAsync();

            return categories;
        }
    }
}