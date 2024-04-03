using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Productivity.Dtos;

namespace Productivity.Models;

public class List
{
    public long Id { get; set; }
    public string Title { get; set; }
    public long CategoryId { get; set; }
    public ListCategory ListCategory { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public DateTime CreatedDate { get; set; }
    [JsonIgnore] public ICollection<ListItem> Items { get; set; }
    [JsonIgnore] public ICollection<Tag> Tags { get; set; }

    public List()
    {
    }

    public List(ListDto listDto)
    {
        Title = listDto.Title;
        CategoryId = listDto.CategoryId;
        UserId = listDto.UserId;
        CreatedDate = DateTime.Now;
    }
}