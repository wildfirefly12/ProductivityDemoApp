using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;

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

        [HttpPost]
        public async Task<ActionResult> Create(TaskDto taskDto)
        {
            Models.Task task = new Models.Task(taskDto);

            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Edit(TaskDto taskDto)
        {
            Models.Task task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskDto.Id);

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.DueDate = taskDto.DueDate;
            task.Priority = taskDto.Priority;
            task.IsRecurring = taskDto.IsRecurring;
            task.IsComplete = taskDto.IsComplete;

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Delete(long id)
        {
            Models.Task task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}