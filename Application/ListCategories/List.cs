using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.ListCategories {
    public class List {
        public class Query: IRequest<Result<List<ListCategory>>> {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ListCategory>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<ListCategory>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<ListCategory>>.Success(await _context.ListCategories
                    .Where(c => c.UserId == request.UserId).ToListAsync());
            }
        }
    }
}