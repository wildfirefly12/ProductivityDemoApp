using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.Lists {
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
                Productivity.Models.List list = await _context.Lists.FindAsync(request.Id);

                if (list == null) return null;

                _context.Lists.Remove(list);
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to delete to list.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}