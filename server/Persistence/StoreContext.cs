using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class StoreContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<Product> Products { get; set; }
}