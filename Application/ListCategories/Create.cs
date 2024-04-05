using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.ListCategories {
    public class Create {
        public class Command : IRequest<Result<Unit>> {
            public CategoryDto Category { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.ListCategories.Add(new ListCategory(request.Category));

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create list category.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}