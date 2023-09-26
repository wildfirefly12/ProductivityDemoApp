using Productivity.Dtos;

namespace Productivity.Models
{
    public class Category
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string UserId { get; set; }
        public bool IsNoteCategory { get; set; }
        public bool IsListCategory { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<List> Lists { get; set; }

        public Category()
        {
        }

        public Category(CategoryDto categoryDto)
        {
            Description = categoryDto.Description;
            Color = categoryDto.Color;
            IsNoteCategory = categoryDto.IsNoteCategory;
            IsListCategory = categoryDto.IsListCategory;
            UserId = categoryDto.UserId;
        }
    }
}