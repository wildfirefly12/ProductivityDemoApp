﻿using Microsoft.AspNetCore.Mvc;
using Productivity.Application.Lists;
using Productivity.Dtos;

namespace Productivity.Controllers;

public class ListsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Productivity.Models.List>>> ByCategory(long id)
    {
        return HandleResult(await Mediator.Send(new List.Query{CategoryId = id}));
    }
        
    [HttpGet]
    public async Task<ActionResult<Productivity.Models.List>> ById(long id)
    {
        return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ListDto list)
    {
        return HandleResult(await Mediator.Send(new Create.Command { List = list }));
    }

    [HttpPost]
    public async Task<IActionResult> Edit([FromBody] ListDto list)
    {
        return HandleResult(await Mediator.Send(new Edit.Command { List = list }));
    }

    [HttpPost]
    public async Task<IActionResult> Delete([FromBody] long id)
    {
        return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
}