using MediatR;
using Microsoft.EntityFrameworkCore;
using Productivity.Core;
using Productivity.Data;
using Task = Productivity.Models.Task;

namespace Productivity.Application.Tasks {
    public class List {
        public class Query: IRequest<Result<List<Task>>> {
            public string UserId { get; set; }
            public string Type { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Task>>> {

            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Task>>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Task> tasks = new List<Task>();
                
                switch (request.Type)
                {
                    case "today":
                        tasks = await _context.Tasks.Where(t => t.UserId == request.UserId && t.DueDate.Date == DateTime.Today.Date).ToListAsync();
                        break;
                    case "pending":
                        tasks = await _context.Tasks.Where(t => t.UserId == request.UserId && !t.IsComplete).ToListAsync();
                        break;
                    case "overdue":
                        tasks = await _context.Tasks.Where(t => t.UserId == request.UserId && !t.IsComplete && t.DueDate < DateTime.Now).ToListAsync();
                        break;
                    case "completed":
                        tasks = await _context.Tasks.Where(t => t.UserId == request.UserId && t.IsComplete).ToListAsync();
                        break;
                    case "recurring":
                        tasks = await _context.Tasks.Where(t => t.UserId == request.UserId && t.IsRecurring).ToListAsync();
                        break;
                    default:
                        tasks = await _context.Tasks.Where(t => t.UserId == request.UserId).ToListAsync();
                        break;
                }

                return Result<List<Task>>.Success(tasks);
            }
        }
    }
}