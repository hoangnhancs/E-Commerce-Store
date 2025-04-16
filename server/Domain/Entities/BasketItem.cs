using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;



public class BasketItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public int Quantity { get; set; }
    //navigation properties
    public required string ProductId { get; set; }
    public required Product Product { get; set; }
    public required string BasketId { get; set; }
    public Basket Basket { get; set; } = null!;
}