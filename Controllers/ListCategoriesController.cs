﻿using Microsoft.AspNetCore.Mvc;
using Productivity.Application.ListCategories;
using Productivity.Dtos;

namespace Productivity.Controllers {
    public class ListCategoriesController : BaseApiController {
        [HttpGet]
        public async Task<IActionResult> ByUser(string id)
        {
            return HandleResult(await Mediator.Send(new List.Query{UserId = id}));
        }
        
        [HttpGet]
        public async Task<IActionResult> ById(long id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryDto category)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Category = category }));
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] CategoryDto category)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Category = category }));
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] long id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}