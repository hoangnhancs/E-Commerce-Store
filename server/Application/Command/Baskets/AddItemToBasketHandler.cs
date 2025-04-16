using System;
using Application.Core;

using Domain.Interfaces;
using MediatR;
using Persistence.Repositories;

namespace Application.Command.Baskets;

public class AddItemToBasketHandler : IRequestHandler<AddItemToBasketCommand, Result<Unit>>
{

    private readonly IBasketRepository _repository;

    public AddItemToBasketHandler(IBasketRepository repository)
    {
        _repository = repository;
    }

    public async Task<Result<Unit>> Handle(AddItemToBasketCommand request, CancellationToken cancellationToken)
    {
        await _repository.AddItemToBasketAsync(request.UserId, request.Product, request.Quantity, cancellationToken);

        var result = await _repository.SaveChangesAsync(cancellationToken);

        if (!result) return Result<Unit>.Failure("Problem saving changes", 400);

        return Result<Unit>.Success(Unit.Value);
    }
}

    
