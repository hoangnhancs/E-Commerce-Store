using System;

namespace Domain.Entities;

public class Basket
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    // Dùng cho anonymous user — lưu buyerId này ở phía client
    public required string UserId { get; set; }
    public User? User { get; set; }
    public List<BasketItem> Items { get; set; } = [];

    public void AddItem(Product product, int quantity)
    {
        if (product == null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than 0.", nameof(quantity));

        var existingItem = FindItem(product.Id);
        if (existingItem != null) existingItem.Quantity += quantity;
        else
        {
            Items.Add(new BasketItem
            {
                Id = Guid.NewGuid().ToString(),
                ProductId = product.Id,
                Product = product,
                Quantity = quantity,
                BasketId = Id,
                Basket = this
            });
        }
    }

    public void RemoveItem(string productId, int quantity)
    {
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than 0.", nameof(quantity));

        var item = FindItem(productId);

        if (item == null) return;

        item.Quantity -= quantity;
        if (item.Quantity <= 0) Items.Remove(item);
    }

    private BasketItem? FindItem(string productId)
    {
        return Items.FirstOrDefault(x => x.ProductId == productId);
    }
}
