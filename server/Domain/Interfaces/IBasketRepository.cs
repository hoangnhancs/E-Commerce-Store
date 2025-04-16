using System;
using System.Collections.Concurrent;
using Domain.Entities;

namespace Domain.Interfaces;

public interface IBasketRepository
{
    Task<Basket?> GetBasketByUserIdAsync(string userId, CancellationToken cancellationToken);
    Task AddItemToBasketAsync(string userId, Product product, int quantity, CancellationToken cancellationToken);
    Task<bool> SaveChangesAsync(CancellationToken cancellationToken);
}
