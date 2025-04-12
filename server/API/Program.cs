using Application.Queries.Products;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IProductRepository, ProductRepository>();


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<GetProductDetailsHandler>());


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<StoreContext>();
    //o dong nay, context đã có sẵn dữ liệu từ database, vì nó được lấy từ DI container,
    // và Entity Framework Core sẽ tự động kết nối với database mà bạn đã cấu hình.
    
    await context.Database.MigrateAsync();
    //chi kiem tra schema, k kiem tra data
    await DbInitializer.SeedData(context);
    //thuc hien seed data trong \Persistence\DbInitializer.cs
    //data se duoc add vao db o line nay
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration.");
    throw;
}

app.Run();
