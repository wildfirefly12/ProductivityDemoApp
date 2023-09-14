using System.Text.Json.Serialization;

namespace Productivity.Models;

public class Note
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Color { get; set; }
    public long CategoryId { get; set; }
    public Category Category { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public DateTime CreatedDate { get; set; }
    [JsonIgnore] public ICollection<Tag> Tags { get; set; }
}