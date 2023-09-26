using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = Productivity.Models.Task;

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
        public async Task<ActionResult<List<Category>>> ByUser(string id)
        {
            List<Category> categories = await _context.Categories
                .Where(category => category.UserId == id)
                .ToListAsync();

            return categories;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> ByType(string id, string type)
        {
            List<Category> categories = new List<Category>();
            
            if (type == "notes")
            {
                categories = await _context.Categories
                    .Where(category => category.UserId == id && category.IsNoteCategory)
                    .ToListAsync();
            }
            else
            {
                categories = await _context.Categories
                    .Where(category => category.UserId == id && category.IsListCategory)
                    .ToListAsync(); 
            }

            return categories;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CategoryDto categoryDto)
        {
            Category category = new Category(categoryDto);

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Update(CategoryDto categoryDto)
        {
            Category category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryDto.Id);

            if (category.UserId == categoryDto.UserId)
            {
                category.Description = categoryDto.Description;
                category.Color = categoryDto.Color;

                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Category cannot be edited.");
        }

        [HttpPost]
        public async Task<ActionResult> Delete(CategoryDto categoryDto)
        {
            Category category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryDto.Id);

            if (category.UserId == categoryDto.UserId)
            {
                _context.Remove(category);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Category cannot be deleted.");
        }
    }
}