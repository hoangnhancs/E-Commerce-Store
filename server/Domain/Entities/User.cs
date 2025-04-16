using System;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? ImageUrl { get; set; }
    public string? Address { get; set; }
    public Basket? Basket { get; set; }
    public long TotalSpent { get; set; }
}
