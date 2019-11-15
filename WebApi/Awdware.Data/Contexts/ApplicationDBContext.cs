using Awdware.Data.Facade.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Awdware.Data.Implementation.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<WebUser> WebUser { get; set; }
        public DbSet<LedEffect> LedConfigs { get; set; }
        public DbSet<LedSetting> LedSettings { get; set; }
        public DbSet<Confirmationkey> UserConfirmations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
                throw new ArgumentNullException(nameof(modelBuilder));
        }
    }
}
