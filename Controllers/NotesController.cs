using Microsoft.AspNetCore.Mvc;
using Productivity.Application.Notes;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using List = Productivity.Application.Notes.List;

namespace Productivity.Controllers
{

    public class NotesController : BaseApiController
    {
        private ApplicationDbContext _context;

        public NotesController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Note>>> ByCategory(long id)
        {
            return await Mediator.Send(new List.Query{CategoryId = id});
        }
        
        [HttpGet]
        public async Task<ActionResult<Note>> ById(long id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NoteDto note)
        {
            await Mediator.Send(new Create.Command { Note = note });
            
            return Ok();
        }
    }
}