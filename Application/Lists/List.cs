using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
namespace Productivity.Application.Lists {
    public class List {
        public class Query: IRequest<Result<List<Productivity.Models.List>>> {
            public long CategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Productivity.Models.List>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Productivity.Models.List>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var lists = await _context.Lists.Where(n => n.CategoryId == request.CategoryId).ToListAsync();

                return Result<List<Productivity.Models.List>>.Success(lists);
            }
        }
    }
}