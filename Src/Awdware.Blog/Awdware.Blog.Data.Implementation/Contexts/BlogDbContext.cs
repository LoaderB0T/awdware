using Awdware.Blog.Data.Facade.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Awdware.Blog.Data.Implementation.Contexts
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options)
            : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
                throw new ArgumentNullException(nameof(modelBuilder));

            modelBuilder.Entity<BlogPost>()
            .Property(e => e.KeyWords)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            modelBuilder.Entity<BlogPostTranslation>()
            .HasKey(c => new { c.PostId, c.Locale, c.ContentKey });
        }
    }
}