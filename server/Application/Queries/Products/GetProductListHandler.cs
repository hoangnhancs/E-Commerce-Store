using Application.Core;
using Application.DTOs;
using Application.Mappers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries.Products;

public class GetProductListHandler(StoreContext context) : IRequestHandler<GetProductListQuery, Result<List<ProductDto>>>
{
    private readonly StoreContext _context = context;

    public async Task<Result<List<ProductDto>>> Handle(GetProductListQuery request, CancellationToken cancellationToken)
    {
        var products = await _context.Products.ToListAsync(cancellationToken);

        var productsDto = products.Select(ProductMapper.MapToDto).ToList();

        if (productsDto == null || productsDto.Count == 0)
        {
            return Result<List<ProductDto>>.Failure("No products found", 404);
        }
        else
        {
            return Result<List<ProductDto>>.Success(productsDto);
        }
    }
}