using Productivity.Dtos;

namespace Productivity.Models
{

    public class ListItem
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public bool IsChecked { get; set; }
        public long ListId { get; set; }
        public List List { get; set; }

        public ListItem()
        {
        }

        public ListItem(ListItemDto itemDto)
        {
            Description = itemDto.Description;
            IsChecked = false;
            ListId = itemDto.ListId;
        }
    }
}