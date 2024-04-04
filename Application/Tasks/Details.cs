using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;

namespace Productivity.Application.Tasks {
    public class Details {
        public class Query: IRequest<Result<Productivity.Models.Task>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Productivity.Models.Task>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Productivity.Models.Task>> Handle(Query request, CancellationToken cancellationToken)
            {
                var task = await _context.Tasks
                    .FirstOrDefaultAsync(l => l.Id == request.Id);

                return Result<Productivity.Models.Task>.Success(task);
            }
        }
    }
}