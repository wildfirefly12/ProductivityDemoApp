using System.Text.Json.Serialization;
using Productivity.Enums;

namespace Productivity.Models
{
    public class Task
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public Priority Priority { get; set; }
        public bool IsRecurring { get; set; }
        public bool IsComplete { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        [JsonIgnore]
        public ICollection<Tag> Tags { get; set; }
    }
}