using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Core.Data.Implementation.Migrations
{
    public partial class RemovedLedCountFromLedSettingEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LedCount",
                table: "LedSettings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LedCount",
                table: "LedSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
