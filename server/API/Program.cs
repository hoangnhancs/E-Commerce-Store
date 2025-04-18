using API.Middleware;
using Application.Queries.Products;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddDbContext<StoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient<ExceptionMiddleware>();


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<GetProductDetailsHandler>());
builder.Services.AddCors();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
// Trong Program.cs
// builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
 .AddRoles<IdentityRole>()
 .AddEntityFrameworkStores<StoreContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(options =>
{
    options
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("https://localhost:3000");
});

app.MapControllers();

app.MapGroup("api").MapIdentityApi<User>(); //chuyen tu api/account thanh api

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<StoreContext>();
    //o dong nay, context đã có sẵn dữ liệu từ database, vì nó được lấy từ DI container,
    // và Entity Framework Core sẽ tự động kết nối với database mà bạn đã cấu hình.
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    //chi kiem tra schema, k kiem tra data
    await DbInitializer.SeedData(context, userManager);
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
