using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Blog.Data.Implementation.Migrations
{
    public partial class BlogPreviewadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Preview",
                table: "BlogPosts",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Preview",
                table: "BlogPosts");
        }
    }
}
