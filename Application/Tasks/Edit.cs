using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;

namespace Productivity.Application.Tasks {
    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public TaskDto Task { get; set; }
        }

        public class Handler : IRequestHandler<Edit.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Edit.Command request, CancellationToken cancellationToken)
            {
                Productivity.Models.Task task = await _context.Tasks.FindAsync(request.Task.Id);

                if (task == null) return null;

                task.Title = request.Task.Title ?? task.Title;
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to save changes to task.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}