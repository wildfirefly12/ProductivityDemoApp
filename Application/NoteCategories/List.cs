using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;

namespace Productivity.Application.NoteCategories {
    public class List {
        public class Query: IRequest<Result<List<NoteCategory>>> {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<NoteCategory>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<NoteCategory>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<NoteCategory>>.Success(await _context.NoteCategories
                    .Where(c => c.UserId == request.UserId).ToListAsync());
            }
        }
    }
}