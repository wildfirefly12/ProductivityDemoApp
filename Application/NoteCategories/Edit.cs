using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.NoteCategories {
    public class Edit {
        public class Command : IRequest {
            public CategoryDto Category { get; set; }
        }

        public class Handler : IRequestHandler<Create.Command> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task Handle(Create.Command request, CancellationToken cancellationToken)
            {
                NoteCategory category = await _context.NoteCategories.FindAsync(request.Category.Id);

                category.Description = request.Category.Description ?? category.Description;
                category.Color = request.Category.Color ?? category.Color;
                
                await _context.SaveChangesAsync();
            }
        }
    }
}