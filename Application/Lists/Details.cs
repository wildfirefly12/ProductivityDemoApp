using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;

namespace Productivity.Application.Lists {
    public class Details {
        public class Query: IRequest<Result<Productivity.Models.List>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Productivity.Models.List>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Productivity.Models.List>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = await _context.Lists
                    .Include(l => l.Items)
                    .FirstOrDefaultAsync(l => l.Id == request.Id);

                return Result<Productivity.Models.List>.Success(list);
            }
        }
    }
}