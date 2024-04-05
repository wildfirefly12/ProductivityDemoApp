using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.JSInterop;
using Productivity.Dtos;
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

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();

        public Task()
        {
        }

        public Task(TaskDto taskDto)
        {
            Title = taskDto.Title;
            Description = taskDto.Description;
            DueDate = taskDto.DueDate;
            Priority = taskDto.Priority;
            IsRecurring = taskDto.IsRecurring;
            IsComplete = taskDto.IsComplete;
            UserId = taskDto.UserId;
            if (taskDto.Tags != null && taskDto.Tags.Count > 0)
            {
                Tags = taskDto.Tags;
            }
        }
    }
}