using System.Collections.Generic;
using Productivity.Dtos;

namespace Productivity.Models
{
    public class NoteCategory
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Note> Notes { get; set; }

        public NoteCategory()
        {
        }

        public NoteCategory(CategoryDto categoryDto)
        {
            Description = categoryDto.Description;
            Color = categoryDto.Color;
            UserId = categoryDto.UserId;
        }
    }
}