using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Core.Data.Implementation.Migrations
{
    public partial class ledEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserConfirmation",
                table: "UserConfirmation");

            migrationBuilder.RenameTable(
                name: "UserConfirmation",
                newName: "UserConfirmations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserConfirmations",
                table: "UserConfirmations",
                column: "KeyString");

            migrationBuilder.CreateTable(
                name: "LedConfigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    ConfigJson = table.Column<string>(nullable: false),
                    Version = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LedConfigs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LedConfigs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserConfirmations",
                table: "UserConfirmations");

            migrationBuilder.RenameTable(
                name: "UserConfirmations",
                newName: "UserConfirmation");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserConfirmation",
                table: "UserConfirmation",
                column: "KeyString");
        }
    }
}
