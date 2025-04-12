using System;
using Application.Queries.Products;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductsController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        return HandleResult(await Mediator.Send(new GetProductListQuery()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductDetails(string id)
    {
        return HandleResult(await Mediator.Send(new GetProductDetailsQuery { ProductId = id }));
    }
}
