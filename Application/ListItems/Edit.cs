using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.ListItems {
    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public ListItemDto ListItem { get; set; }
        }

        public class Handler : IRequestHandler<Edit.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Edit.Command request, CancellationToken cancellationToken)
            {
                ListItem item = await _context.ListItems.FindAsync(request.ListItem.Id);

                if (item == null) return null;

                item.Description = request.ListItem.Description ?? item.Description;
                item.IsChecked = request.ListItem.IsChecked ?? item.IsChecked;
                
                var result =  await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to save changes to item.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}