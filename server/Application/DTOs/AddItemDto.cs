using System;

namespace Application.DTOs;

public class AddItemDto
{
    public required string ProductId { get; set; }
    public int Quantity { get; set; } = 1;
}