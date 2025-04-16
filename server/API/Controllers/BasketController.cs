using System;
using Application.Command.Baskets;
using Application.Queries.Baskets;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers;

public class BasketController() : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetBasket()
    {
        var userId = Request.Cookies["userId"];

        if (string.IsNullOrEmpty(userId))
            return BadRequest("User ID not found in cookies");
        
        return HandleResult(await Mediator.Send(new GetBasketQuery {UserId = userId}));
    }

    [HttpPost]
    public async Task<IActionResult> AddItemToBasket(AddItemToBasketCommand command)
    {

        var userId = Request.Cookies["userId"];

        if (string.IsNullOrEmpty(userId)) 
        {
            return Unauthorized();
        }

        command.UserId = userId;

        return HandleResult(await Mediator.Send(command));
    }
}
