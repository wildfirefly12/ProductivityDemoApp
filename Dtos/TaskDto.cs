using System;
using System.Collections.Generic;
using Productivity.Enums;
using Productivity.Models;

namespace Productivity.Dtos;

public class TaskDto
{
    public long? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public Priority Priority { get; set; }
    public bool IsRecurring { get; set; }
    public bool IsComplete { get; set; }
    public string UserId { get; set; }
    public List<Tag>? Tags { get; set; }
}