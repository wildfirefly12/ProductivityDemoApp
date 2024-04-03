using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;
using Task = System.Threading.Tasks.Task;

namespace Productivity.Controllers;

public class ListItemsController : BaseApiController
{
    private ApplicationDbContext _context;

    public ListItemsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ListItem>>> ByList(long id)
    {
        List<ListItem> items = await _context.ListItems
            .Where(i => i.ListId == id)
            .ToListAsync();

        return items;
    }

    [HttpPost]
    public async Task<ActionResult> Create(ListItemDto itemDto)
    {
        ListItem item = new ListItem(itemDto);

        await _context.ListItems.AddAsync(item);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> Edit(ListItemDto itemDto)
    {
        ListItem item = await _context.ListItems.FirstOrDefaultAsync(i => i.Id == itemDto.Id);

        item.Description = itemDto.Description;
        item.IsChecked = itemDto.IsChecked;

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> Delete(long id)
    {
        ListItem item = await _context.ListItems.FirstOrDefaultAsync(i => i.Id == id);

        _context.ListItems.Remove(item);
        await _context.SaveChangesAsync();

        return Ok();
    }
}