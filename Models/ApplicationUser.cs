using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Productivity.Services;

namespace Productivity.Models;

public class ApplicationUser : IdentityUser
{
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    [JsonIgnore] public ICollection<Task> Tasks { get; set; }
    [JsonIgnore] public ICollection<Tag> Tags { get; set; }
    [JsonIgnore] public ICollection<Note> Notes { get; set; }
    [JsonIgnore] public ICollection<NoteCategory> Categories { get; set; }
    [JsonIgnore] public ICollection<List> Lists { get; set; }
}