using Awdware.Led.Data.Facade.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Awdware.Led.Data.Implementation.Contexts
{
    public class LedDbContext : DbContext
    {
        public LedDbContext(DbContextOptions<LedDbContext> options)
            : base(options)
        {
        }

        public DbSet<LedEffect> LedConfigs { get; set; }
        public DbSet<LedSetting> LedSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
                throw new ArgumentNullException(nameof(modelBuilder));
        }
    }
}
