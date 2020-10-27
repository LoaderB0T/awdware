using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Blog.Data.Implementation.Migrations
{
    public partial class Bloginit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPosts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(maxLength: 64, nullable: false),
                    Content = table.Column<string>(nullable: false),
                    DateTime = table.Column<DateTime>(nullable: false),
                    KeyWords = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPosts");
        }
    }
}
