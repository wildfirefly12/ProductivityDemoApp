using MediatR;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.Notes {
    public class Create {
        public class Command : IRequest {
            public NoteDto Note { get; set; }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Notes.Add(new Note(request.Note));

                await _context.SaveChangesAsync();
            }
        }
    }
}