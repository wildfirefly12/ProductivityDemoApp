using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.ListItems {
    public class Delete {
        public class Command : IRequest<Result<Unit>> {
            public long Id { get; set; }
        }

        public class Handler : IRequestHandler<Delete.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Delete.Command request, CancellationToken cancellationToken)
            {
                ListItem item = await _context.ListItems
                    .FirstOrDefaultAsync(c => c.Id == request.Id);

                if (item == null) return null;
                
                _context.ListItems.Remove(item);

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Failure to delete item.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}