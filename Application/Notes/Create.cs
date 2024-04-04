﻿using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.Notes {
    public class Create {
        public class Command : IRequest<Result<Unit>> {
            public NoteDto Note { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Notes.Add(new Note(request.Note));

                var result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Failed to create note.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}