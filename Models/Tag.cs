using System.Collections.Generic;
using System.Text.Json.Serialization;
using Productivity.Dtos;

namespace Productivity.Models
{
    public class Tag
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        [JsonIgnore] public ICollection<Task> Tasks { get; set; }
        [JsonIgnore] public ICollection<Note> Notes { get; set; }
        [JsonIgnore] public ICollection<List> Lists { get; set; }

        public Tag()
        {
        }

        public Tag(TagDto tagDto)
        {
            Description = tagDto.Description;
            Color = tagDto.Color;
            UserId = tagDto.UserId;
        }
    }
}