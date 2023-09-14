using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Productivity.Models;

public class ApplicationUser : IdentityUser
{
    [JsonIgnore] public ICollection<Task> Tasks { get; set; }
    [JsonIgnore] public ICollection<Tag> Tags { get; set; }
    [JsonIgnore] public ICollection<Note> Notes { get; set; }
    [JsonIgnore] public ICollection<Category> Categories { get; set; }
    [JsonIgnore] public ICollection<List> Lists { get; set; }
}