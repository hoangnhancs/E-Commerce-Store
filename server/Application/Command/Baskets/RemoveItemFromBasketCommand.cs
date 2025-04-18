using System;
using System.Text.Json.Serialization;
using Application.Core;
using MediatR;

namespace Application.Command.Baskets;

public class RemoveItemFromBasketCommand : IRequest<Result<Unit>>
{
    [JsonIgnore]
    public string? UserId { get; set; }
    public required string ProductId { get; set; }
    public required int Quantity { get; set; }
}

