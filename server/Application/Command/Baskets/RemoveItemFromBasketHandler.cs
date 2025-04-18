using System;
using Application.Core;
using Application.DTOs;
using Application.Mappers;
using Domain.Entities;
using Domain.Interfaces;
using MediatR;

namespace Application.Command.Baskets;

public class RemoveItemFromBasketHandler : IRequestHandler<RemoveItemFromBasketCommand, Result<BasketDto>>
{
    private readonly IBasketRepository _basketRepository;
    private readonly IProductRepository _productRepository;
    public RemoveItemFromBasketHandler(IBasketRepository basketRepository, IProductRepository productRepository)
    {
        _basketRepository = basketRepository;
        _productRepository = productRepository;
    }

    public async Task<Result<BasketDto>> Handle(RemoveItemFromBasketCommand request, CancellationToken cancellationToken)
    {

        if (string.IsNullOrEmpty(request.UserId))
        {
            return Result<BasketDto>.Failure("User ID cannot be null or empty", 400);
        }

        var product = await _productRepository.GetProductByIdAsync(request.ProductId, cancellationToken);

        if (product == null) return Result<BasketDto>.Failure("Product not found", 404);

        var newBasket = await _basketRepository.RemoveItemFromBasketAsync(request.UserId, request.ProductId, request.Quantity, cancellationToken);

        var result = await _basketRepository.SaveChangesAsync(cancellationToken);

        if (!result) return Result<BasketDto>.Failure("Don't have any changes", 400);

        return Result<BasketDto>.Success(BasketMapper.MapToDto(newBasket));
    }
}
