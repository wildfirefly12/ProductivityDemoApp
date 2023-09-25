using Duende.IdentityServer.Services.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = Productivity.Models.Task;

namespace Productivity.Controllers
{

    public class TasksController : BaseApiController
    {

        private ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Models.Task>>> ByUser(string id)
        {
            List<Models.Task> tasks = await _context.Tasks
                .Where(t => t.UserId == id)
                .ToListAsync();

            return tasks;
        }

        [HttpGet]
        public async Task<ActionResult<List<Models.Task>>> ByType(string id, string type)
        {
            List<Models.Task> tasks = new List<Task>();
            
            switch (type)
            {
                case "today":
                    tasks = await _context.Tasks
                        .Include(t => t.Tags)
                        .Where(t => t.UserId == id && t.DueDate.Date == DateTime.Today && !t.IsComplete)
                        .ToListAsync();
                    break;
                case "pending":
                    tasks = await _context.Tasks
                        .Include(t => t.Tags)
                        .Where(t => t.UserId == id && !t.IsComplete)
                        .ToListAsync();
                    break;
                case "overdue":
                    tasks = await _context.Tasks
                        .Include(t => t.Tags)
                        .Where(t => t.UserId == id && t.DueDate.Date < DateTime.Today && !t.IsComplete)
                        .ToListAsync();
                    break;
                case "completed":
                    tasks = await _context.Tasks
                        .Include(t => t.Tags)
                        .Where(t => t.UserId == id && t.IsComplete)
                        .ToListAsync();
                    break;
                case "recurring":
                    tasks = await _context.Tasks
                        .Include(t => t.Tags)
                        .Where(t => t.UserId == id && t.IsRecurring && !t.IsComplete)
                        .ToListAsync();
                    break;
                default:
                    tasks = await _context.Tasks
                        .Include(t => t.Tags)
                        .Where(t => t.UserId == id)
                        .ToListAsync();
                    break;
            }
            
            

            return tasks;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] TaskDto taskDto)
        {
            Models.Task task = new Models.Task(taskDto);

            foreach (var tag in task.Tags)
            {
                _context.Set<Tag>().Attach(tag);
            }
            
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Edit([FromBody] TaskDto taskDto)
        {
            Models.Task task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskDto.Id);

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.DueDate = taskDto.DueDate;
            task.Priority = taskDto.Priority;
            task.IsRecurring = taskDto.IsRecurring;
            task.IsComplete = taskDto.IsComplete;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Delete([FromBody] long id)
        {
            Models.Task task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}