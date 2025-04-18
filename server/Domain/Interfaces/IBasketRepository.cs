using System;
using System.Collections.Concurrent;
using Domain.Entities;

namespace Domain.Interfaces;

public interface IBasketRepository
{
    Task<Basket?> GetBasketByUserIdAsync(string userId, CancellationToken cancellationToken);
    Task<Basket> AddItemToBasketAsync(string userId, Product product, int quantity, CancellationToken cancellationToken);
    Task<Basket> RemoveItemFromBasketAsync(string userId, string productId, int quantity, CancellationToken cancellationToken);
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken);
    Task CreateBasketAsync(string userId,CancellationToken cancellationToken);  
}
