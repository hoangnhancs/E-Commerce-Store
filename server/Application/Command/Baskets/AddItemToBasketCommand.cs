using System;
using Application.Core;
using Domain.Entities;
using MediatR;

namespace Application.Command.Baskets;

public class AddItemToBasketCommand : IRequest<Result<Unit>>
{
    public required string UserId { get; set; }
    public required Product Product { get; set; }
    public required int Quantity { get; set; }
}
