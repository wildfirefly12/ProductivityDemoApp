using System.Collections.Generic;
using Productivity.Dtos;

namespace Productivity.Models {
    public class ListCategory {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<List> Lists { get; set; }

        public ListCategory()
        {
        }

        public ListCategory(CategoryDto categoryDto)
        {
            Description = categoryDto.Description;
            Color = categoryDto.Color;
            UserId = categoryDto.UserId;
        }
    }
}