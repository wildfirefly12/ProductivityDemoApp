using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;

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
        public async Task<ActionResult<List<Note>>> ByUser(string id)
        {
            List<Note> notes = await _context.Notes
                .Where(n => n.UserId == id)
                .ToListAsync();

            return notes;
        }

        [HttpGet]
        public async Task<ActionResult<List<Note>>> ByCategory(long id)
        {
            List<Note> notes = await _context.Notes
                .Where(n => n.CategoryId == id)
                .ToListAsync();

            return notes;
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] NoteDto noteDto)
        {
            Note note = new Note(noteDto);

            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Edit([FromBody] NoteDto noteDto)
        {
            Note note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == noteDto.Id);

            note.Title = noteDto.Title;
            note.Content = noteDto.Content;
            note.Color = noteDto.Color;
            note.CategoryId = noteDto.CategoryId;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Delete(long id)
        {
            Note note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}