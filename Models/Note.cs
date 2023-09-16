using System.Text.Json.Serialization;
using Productivity.Dtos;

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

    public Note()
    {
    }

    public Note(NoteDto noteDto)
    {
        Title = noteDto.Title;
        Content = noteDto.Content;
        Color = noteDto.Color;
        CategoryId = noteDto.CategoryId;
        UserId = noteDto.UserId;
        CreatedDate = DateTime.Today;
    }
}