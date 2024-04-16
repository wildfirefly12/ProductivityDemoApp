using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.ListItems {
    public class Details {
        public class Query: IRequest<Result<ListItem>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ListItem>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<ListItem>> Handle(Query request, CancellationToken cancellationToken)
            {
                var item = await _context.ListItems.FirstOrDefaultAsync(c => c.Id == request.Id);

                return Result<ListItem>.Success(item);
            }
        }
    }
}