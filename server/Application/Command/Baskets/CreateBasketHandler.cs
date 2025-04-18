using System;
using Application.Core;
using Domain.Interfaces;
using MediatR;

namespace Application.Command.Baskets;

public class CreateBasketHandler : IRequestHandler<CreateBasketCommand, Result<Unit>>
{
    private readonly IBasketRepository _repository; 
    public CreateBasketHandler(IBasketRepository repository)
    {
        _repository = repository;
    }
    public async Task<Result<Unit>> Handle(CreateBasketCommand request, CancellationToken cancellationToken)
    {
        await _repository.CreateBasketAsync(request.UserId, cancellationToken);
        var result = await _repository.SaveChangesAsync(cancellationToken);
        if (!result) return Result<Unit>.Failure("Problem when create basket", 400);
        return Result<Unit>.Success(Unit.Value);
    }
}
