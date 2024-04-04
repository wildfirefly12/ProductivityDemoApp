﻿using MediatR;
using Productivity.Core;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Application.Notes {
    public class Edit {
        public class Command : IRequest<Result<Unit>> {
            public NoteDto Note { get; set; }
        }

        public class Handler : IRequestHandler<Edit.Command, Result<Unit>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Edit.Command request, CancellationToken cancellationToken)
            {
                Note note = await _context.Notes.FindAsync(request.Note.Id);

                if (note == null) return null;

                note.Title = request.Note.Title ?? note.Title;
                note.Content = request.Note.Content ?? note.Content;
                note.Color = request.Note.Color ?? note.Color;
                
                var result = await _context.SaveChangesAsync() > 0;
                
                if (!result) return Result<Unit>.Failure("Failed to save changes to note.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}