using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using Productivity.Models;
using Task = Productivity.Models.Task;

namespace Productivity.Data
{

    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<ListItem> ListItems { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>()
                .HasOne(c => c.User)
                .WithMany(u => u.Categories)
                .HasForeignKey(c => c.UserId)
                .IsRequired();

            builder.Entity<Note>()
                .HasOne(n => n.Category)
                .WithMany(c => c.Notes)
                .HasForeignKey(n => n.CategoryId)
                .IsRequired();

            builder.Entity<List>()
                .HasOne(l => l.Category)
                .WithMany(c => c.Lists)
                .HasForeignKey(l => l.CategoryId)
                .IsRequired();

            builder.Entity<List>()
                .HasOne(l => l.User)
                .WithMany(u => u.Lists)
                .HasForeignKey(l => l.UserId)
                .IsRequired();

            builder.Entity<ListItem>()
                .HasOne(l => l.List)
                .WithMany(u => u.Items)
                .HasForeignKey(l => l.ListId)
                .IsRequired();

            builder.Entity<Task>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Tasks)
                .UsingEntity(
                    "TaskTag",
                    l => l.HasOne(typeof(Tag)).WithMany().HasForeignKey("TagsId").HasPrincipalKey(nameof(Tag.Id)),
                    r => r.HasOne(typeof(Task)).WithMany().HasForeignKey("TasksId").HasPrincipalKey(nameof(Task.Id)),
                    j => j.HasKey("TasksId", "TagsId"));

            builder.Entity<List>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Lists)
                .UsingEntity(
                    "ListTag",
                    l => l.HasOne(typeof(Tag)).WithMany().HasForeignKey("TagsId").HasPrincipalKey(nameof(Tag.Id)),
                    r => r.HasOne(typeof(List)).WithMany().HasForeignKey("ListsId").HasPrincipalKey(nameof(List.Id)),
                    j => j.HasKey("ListsId", "TagsId"));

            builder.Entity<Note>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Notes)
                .UsingEntity(
                    "NotedTag",
                    l => l.HasOne(typeof(Tag)).WithMany().HasForeignKey("TagsId").HasPrincipalKey(nameof(Tag.Id)),
                    r => r.HasOne(typeof(Note)).WithMany().HasForeignKey("NotesId").HasPrincipalKey(nameof(Note.Id)),
                    j => j.HasKey("NotesId", "TagsId"));

        }
    }
}