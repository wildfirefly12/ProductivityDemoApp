using System.Reflection;
using System.Text;
using dotenv.net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Productivity.Data;
using Productivity.Models;
using Productivity.Services;

var builder = WebApplication.CreateBuilder(args);

DotEnv.Load();
var connectionString = Environment.GetEnvironmentVariable("DEFAULTCONNECTION");

// Add services to the container.
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString,
        new MySqlServerVersion(new Version(1, 0, 0))));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();;

builder.Services.AddIdentityServer(options =>
    {
        options.KeyManagement.RotationInterval = TimeSpan.FromDays(30);
    
        // announce new key 2 days in advance in discovery
        options.KeyManagement.PropagationTime = TimeSpan.FromDays(2);
    
        // keep old key for 7 days in discovery for validation of tokens
        options.KeyManagement.RetentionDuration = TimeSpan.FromDays(7);

        // don't delete keys after their retention period is over
        options.KeyManagement.DeleteRetiredKeys = false;
    })
    .AddDeveloperSigningCredential()
    .AddOperationalStore(options =>
    {
        options.ConfigureDbContext = builder =>
            builder.UseMySql(connectionString,
                new MySqlServerVersion(new Version(1, 0, 0)));

        // this enables automatic token cleanup. this is optional.
        options.EnableTokenCleanup = true;
        options.TokenCleanupInterval = 3600; // interval in seconds (default is 3600)
    })
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MaICDsOchnstDn3EBFYVIRSqy5PhjRXqmHwjMs9qlso7qcN1Pr"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    })
    .AddIdentityServerJwt();

builder.Services.AddScoped<TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseIdentityServer();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapRazorPages();

app.MapFallbackToFile("index.html");
;

app.Run();