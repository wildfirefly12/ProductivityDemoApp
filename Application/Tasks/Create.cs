using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;

namespace Productivity.Application.Tasks {
    public class Create {
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
                _context.Tasks.Add(new Productivity.Models.Task(request.Task));

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create task.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}