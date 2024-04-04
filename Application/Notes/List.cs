using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.Notes {
    public class List {
        public class Query: IRequest<Result<List<Note>>> {
            public long CategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Note>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Note>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var notes = await _context.Notes.Where(n => n.CategoryId == request.CategoryId).ToListAsync();

                return Result<List<Note>>.Success(notes);
            }
        }
    }
}