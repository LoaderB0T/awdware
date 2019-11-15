using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Data.Implementation.Migrations
{
    public partial class LedSettingEnhancements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ComPortName",
                table: "LedSettings",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComPortName",
                table: "LedSettings");
        }
    }
}
