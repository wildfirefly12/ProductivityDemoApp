using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;

namespace Productivity.Application.Tasks {
    public class List {
        public class Query: IRequest<Result<List<Productivity.Models.Task>>> {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Productivity.Models.Task>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Productivity.Models.Task>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tasks = await _context.Tasks.Where(t => t.UserId == request.UserId).ToListAsync();

                return Result<List<Productivity.Models.Task>>.Success(tasks);
            }
        }
    }
}