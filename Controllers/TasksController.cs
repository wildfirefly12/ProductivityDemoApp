using Microsoft.AspNetCore.Mvc;
using Productivity.Application.Tasks;
using Productivity.Dtos;

namespace Productivity.Controllers
{

    public class TasksController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Models.Task>>> ByUser(string id)
        {
            return HandleResult(await Mediator.Send(new List.Query{UserId = id}));
        }
        
        [HttpGet]
        public async Task<ActionResult<Models.Task>> ById(long id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskDto task)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Task = task }));
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] TaskDto task)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Task = task }));
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromBody] long id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}