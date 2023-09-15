using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Productivity.Controllers;

[Route("api/[controller]/[action]")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}