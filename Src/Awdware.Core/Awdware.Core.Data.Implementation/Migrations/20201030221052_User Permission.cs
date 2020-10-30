using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Core.Data.Implementation.Migrations
{
    public partial class UserPermission : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LedConfigs");

            migrationBuilder.DropTable(
                name: "LedSettings");

            migrationBuilder.AddColumn<int>(
                name: "Permission",
                table: "WebUser",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Permission",
                table: "WebUser");

            migrationBuilder.CreateTable(
                name: "LedConfigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConfigJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Ordinal = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LedConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LedSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ComPortName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SettingName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LedSettings", x => x.Id);
                });
        }
    }
}
