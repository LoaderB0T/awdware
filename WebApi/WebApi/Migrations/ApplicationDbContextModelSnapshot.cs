﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Contexts;

namespace WebApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApi.Entities.Confirmationkey", b =>
                {
                    b.Property<string>("KeyString");

                    b.Property<int>("ConfirmType");

                    b.Property<DateTime?>("Expiration");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("KeyString");

                    b.ToTable("UserConfirmation");
                });

            modelBuilder.Entity("WebApi.Entities.WebUser", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<bool>("ConfirmedMail");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.HasKey("UserId");

                    b.ToTable("WebUser");
                });
#pragma warning restore 612, 618
        }
    }
}
