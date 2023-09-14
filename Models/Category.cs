namespace Productivity.Models
{
    public class Category
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<List> Lists { get; set; }
    }
}