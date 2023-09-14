using System.Text.Json.Serialization;

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
    }
}