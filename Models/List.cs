using System.Text.Json.Serialization;

namespace Productivity.Models;

public class List
{
    public long Id { get; set; }
    public string Title { get; set; }
    public long CategoryId { get; set; }
    public Category Category { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public DateTime CreatedDate { get; set; }
    [JsonIgnore] public ICollection<ListItem> Items { get; set; }
    [JsonIgnore] public ICollection<Tag> Tags { get; set; }
}