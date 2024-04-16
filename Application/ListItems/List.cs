using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.ListItems {
    public class List {
        public class Query: IRequest<Result<List<ListItem>>> {
            public long ListId{ get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ListItem>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<ListItem>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<ListItem>>.Success(await _context.ListItems
                    .Where(l => l.ListId == request.ListId).ToListAsync());
            }
        }
    }
}