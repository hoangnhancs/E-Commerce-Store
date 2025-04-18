using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class StoreContext(DbContextOptions options) : IdentityDbContext(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id = "9c47b469-293b-406c-8078-e82a8f2d7072", Name = "Admin", NormalizedName = "ADMIN"},
                new IdentityRole {Id = "6b35a1c6-4a79-4154-bc92-7d65a5602676", Name = "Member", NormalizedName = "MEMBER"}
            );
    }
    
}