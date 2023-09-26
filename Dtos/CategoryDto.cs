namespace Productivity.Dtos;

public class CategoryDto
{
    public long? Id { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }
    public bool IsNoteCategory { get; set; }
    public bool IsListCategory { get; set; }
    public string UserId { get; set; }
}