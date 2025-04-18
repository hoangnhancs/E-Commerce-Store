using System;
using Application.Core;
using Domain.Interfaces;
using MediatR;

namespace Application.Command.Baskets;

public class RemoveItemFromBasketHandler : IRequestHandler<RemoveItemFromBasketCommand, Result<Unit>>
{
    private readonly IBasketRepository _basketRepository;
    private readonly IProductRepository _productRepository;
    public RemoveItemFromBasketHandler(IBasketRepository basketRepository, IProductRepository productRepository)
    {
        _basketRepository = basketRepository;
        _productRepository = productRepository;
    }

    public async Task<Result<Unit>> Handle(RemoveItemFromBasketCommand request, CancellationToken cancellationToken)
    {

        if (string.IsNullOrEmpty(request.UserId))
        {
            return Result<Unit>.Failure("User ID cannot be null or empty", 400);
        }

        var product = await _productRepository.GetProductByIdAsync(request.ProductId, cancellationToken);

        if (product == null) return Result<Unit>.Failure("Product not found", 404);

        await _basketRepository.RemoveItemFromBasketAsync(request.UserId, request.ProductId, request.Quantity, cancellationToken);

        var result = await _basketRepository.SaveChangesAsync(cancellationToken);

        if (!result) return Result<Unit>.Failure("Problem saving changes", 400);

        return Result<Unit>.Success(Unit.Value);
    }
}
