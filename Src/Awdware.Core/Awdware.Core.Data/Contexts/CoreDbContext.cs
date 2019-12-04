using Awdware.Core.Data.Facade.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Awdware.Core.Data.Implementation.Contexts
{
    public class AwdwareCoreDbContext : DbContext
    {
        public AwdwareCoreDbContext(DbContextOptions<AwdwareCoreDbContext> options)
            : base(options)
        {
        }

        public DbSet<WebUser> WebUser { get; set; }
        public DbSet<Confirmationkey> UserConfirmations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
                throw new ArgumentNullException(nameof(modelBuilder));
        }
    }
}
