using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.NoteCategories {
    public class Delete {
        public class Command : IRequest<Result<Unit>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Delete.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Delete.Command request, CancellationToken cancellationToken)
            {
                NoteCategory category = await _context.NoteCategories
                    .Include(n => n.Notes)
                    .FirstOrDefaultAsync(c => c.Id == request.Id);

                if (category == null) return null;
                
                if(category.Notes.Count > 0) return Result<Unit>.Failure("Cannot delete a category with existing notes.");
                
                _context.NoteCategories.Remove(category);

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Failure to delete category.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}