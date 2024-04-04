using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;

namespace Productivity.Application.Lists {
    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public ListDto List { get; set; }
        }

        public class Handler : IRequestHandler<Edit.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Edit.Command request, CancellationToken cancellationToken)
            {
                Productivity.Models.List list = await _context.Lists.FindAsync(request.List.Id);

                if (list == null) return null;

                list.Title = request.List.Title ?? list.Title;
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to save changes to List.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}