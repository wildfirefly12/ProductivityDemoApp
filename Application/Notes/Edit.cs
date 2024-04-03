using MediatR;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.Notes {
    public class Edit {
        public class Command : IRequest {
            public NoteDto Note { get; set; }
        }

        public class Handler : IRequestHandler<Create.Command> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task Handle(Create.Command request, CancellationToken cancellationToken)
            {
                Note note = await _context.Notes.FindAsync(request.Note.Id);

                note.Title = request.Note.Title ?? note.Title;
                note.Content = request.Note.Content ?? note.Content;
                note.Color = request.Note.Color ?? note.Color;
                
                await _context.SaveChangesAsync();
            }
        }
    }
}