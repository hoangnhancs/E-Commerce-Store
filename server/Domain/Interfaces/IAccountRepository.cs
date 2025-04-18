using System;
using Domain.Entities;

namespace Domain.Interfaces;

public interface IAccountRepository 
{
    Task<User?> GetUserByIdAsync(string userId, CancellationToken cancellationToken);
}
