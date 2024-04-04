using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;

namespace Productivity.Application.Lists {
    public class Create {
        public class Command : IRequest<Result<Unit>> {
            public ListDto List { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Lists.Add(new Productivity.Models.List(request.List));

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create  List.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}