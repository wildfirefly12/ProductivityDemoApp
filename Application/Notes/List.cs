using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.Notes {
    public class List {
        public class Query: IRequest<List<Note>> {
            public long CategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Note>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<List<Note>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Notes.Where(n => n.CategoryId == request.CategoryId).ToListAsync();
            }
        }
    }
}