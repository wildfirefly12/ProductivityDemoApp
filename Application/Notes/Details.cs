using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.Notes {
    public class Details {
        public class Query: IRequest<Result<Note>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Note>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Note>> Handle(Query request, CancellationToken cancellationToken)
            {
                var note = await _context.Notes.FirstOrDefaultAsync(c => c.Id == request.Id);

                return Result<Note>.Success(note);
            }
        }
    }
}