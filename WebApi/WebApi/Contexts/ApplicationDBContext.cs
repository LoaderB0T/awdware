using Microsoft.EntityFrameworkCore;
using System;
using WebApi.Entities;

namespace WebApi.Contexts
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
