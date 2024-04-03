using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productivity.Data;
using Productivity.Dtos;
using Productivity.Models;

namespace Productivity.Controllers;

public class ListsController : BaseApiController
{
    private ApplicationDbContext _context;

    public ListsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<List<List>>> ByUser(string id)
    {
        List<List> lists = await _context.Lists
            .Where(l => l.UserId == id)
            .ToListAsync();

        return lists;
    }

    [HttpGet]
    public async Task<ActionResult<List<List>>> ByCategory(long id)
    {
        List<List> lists = await _context.Lists
            .Where(l => l.CategoryId == id)
            .ToListAsync();

        return lists;
    }

    [HttpPost]
    public async Task<ActionResult> Create(ListDto listDto)
    {
        List list = new List(listDto);

        await _context.Lists.AddAsync(list);
        
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> Edit(ListDto listDto)
    {
        List list = await _context.Lists.FirstOrDefaultAsync(l => l.Id == listDto.Id);

        list.Title = listDto.Title;
        list.CategoryId = listDto.CategoryId;

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> Delete(long id)
    {
        List list = await _context.Lists.FirstOrDefaultAsync(l => l.Id == id);

        _context.Lists.Remove(list);
        await _context.SaveChangesAsync();

        return Ok();
    }
}