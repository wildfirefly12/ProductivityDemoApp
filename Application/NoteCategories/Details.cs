using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.NoteCategories {
    public class Details {
        public class Query: IRequest<Result<NoteCategory>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<NoteCategory>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<NoteCategory>> Handle(Query request, CancellationToken cancellationToken)
            {
                var category = await _context.NoteCategories.FirstOrDefaultAsync(c => c.Id == request.Id);

                return Result<NoteCategory>.Success(category);
            }
        }
    }
}