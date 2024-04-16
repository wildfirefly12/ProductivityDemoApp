using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;

namespace Productivity.Application.ListItems {
    public class Create {
        public class Command : IRequest<Result<Unit>> {
            public ListItemDto ListItem { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.ListItems.Add(new Productivity.Models.ListItem(request.ListItem));

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create  List.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}