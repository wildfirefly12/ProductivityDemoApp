using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.NoteCategories {
    public class Details {
        public class Query: IRequest<NoteCategory> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, NoteCategory> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<NoteCategory> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.NoteCategories.FirstOrDefaultAsync(c => c.Id == request.Id);
            }
        }
    }
}