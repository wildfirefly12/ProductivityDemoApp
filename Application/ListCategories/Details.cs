using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.ListCategories {
    public class Details {
        public class Query: IRequest<Result<ListCategory>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ListCategory>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<ListCategory>> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.ListCategories.FirstOrDefaultAsync(c => c.Id == request.Id);

                return Result<ListCategory>.Success(category);
            }
        }
    }
}