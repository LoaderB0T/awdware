using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserConfirmation",
                columns: table => new
                {
                    KeyString = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    ConfirmType = table.Column<int>(nullable: false),
                    Expiration = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserConfirmation", x => x.KeyString);
                });

            migrationBuilder.CreateTable(
                name: "WebUser",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    Firstname = table.Column<string>(maxLength: 30, nullable: false),
                    Lastname = table.Column<string>(maxLength: 30, nullable: false),
                    Username = table.Column<string>(maxLength: 20, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: false),
                    ConfirmedMail = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebUser", x => x.UserId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserConfirmation");

            migrationBuilder.DropTable(
                name: "WebUser");
        }
    }
}
