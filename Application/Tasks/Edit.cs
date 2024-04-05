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

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Models.Task task = await _context.Tasks.FindAsync(request.Task.Id);

                if (task == null) return null;

                task.Title = request.Task.Title ?? task.Title;
                task.Description = request.Task.Description ?? task.Description;
                task.IsComplete = request.Task.IsComplete;
                task.IsRecurring = request.Task.IsRecurring;
                task.DueDate = request.Task.DueDate;
                
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to save changes to task.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}