using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.NoteCategories {
    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public CategoryDto Category { get; set; }
        }

        public class Handler : IRequestHandler<Edit.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Edit.Command request, CancellationToken cancellationToken)
            {
                NoteCategory category = await _context.NoteCategories.FindAsync(request.Category.Id);

                if (category == null) return null;

                category.Description = request.Category.Description ?? category.Description;
                category.Color = request.Category.Color ?? category.Color;
                
                var result =  await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to save changes to category.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}