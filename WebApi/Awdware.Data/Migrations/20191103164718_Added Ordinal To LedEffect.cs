using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Data.Implementation.Migrations
{
    public partial class AddedOrdinalToLedEffect : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Ordinal",
                table: "LedConfigs",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ordinal",
                table: "LedConfigs");
        }
    }
}
