using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.Notes {
    public class Details {
        public class Query: IRequest<Note> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Note> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Note> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Notes.FirstOrDefaultAsync(c => c.Id == request.Id);
            }
        }
    }
}