using System;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class BasketRepository(StoreContext context) : IBasketRepository
{
    private readonly StoreContext _context = context;

    public async Task AddItemToBasketAsync(string userId, Product product, int quantity, CancellationToken cancellationToken)
    {
        var basket = await GetBasketByUserIdAsync(userId, cancellationToken);

        if (basket == null)
        {
            basket = new Basket { UserId = userId };
            _context.Baskets.Add(basket);
        }

        basket.AddItem(product, quantity);
    }

    public Task CreateBasketAsync(string userId, CancellationToken cancellationToken)
    {
        var basket = new Basket { UserId = userId };
        _context.Baskets.Add(basket);
        return Task.CompletedTask;
    }

    public async Task<Basket?> GetBasketByUserIdAsync(string userId, CancellationToken cancellationToken)
    {
        return await _context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(b => b.UserId == userId, cancellationToken);
    }

    public async Task RemoveItemFromBasketAsync(string userId, string productId, int quantity, CancellationToken cancellationToken)
    {
        var basket = await GetBasketByUserIdAsync(userId, cancellationToken);
        if (basket == null) return;
        basket.RemoveItem(productId, quantity);
    }

    public async Task<bool> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}
