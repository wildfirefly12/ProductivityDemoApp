using Microsoft.AspNetCore.Mvc;
using Productivity.Application.NoteCategories;
using Productivity.Dtos;
using Productivity.Models;
using List = Productivity.Application.NoteCategories.List;

namespace Productivity.Controllers
{

    public class NoteCategoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<NoteCategory>>> ByUser(string id)
        {
            return await Mediator.Send(new List.Query{UserId = id});
        }
        
        [HttpGet]
        public async Task<ActionResult<NoteCategory>> ById(long id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CategoryDto category)
        {
            await Mediator.Send(new Create.Command { Category = category });
            
            return Ok();
        }
    }
}