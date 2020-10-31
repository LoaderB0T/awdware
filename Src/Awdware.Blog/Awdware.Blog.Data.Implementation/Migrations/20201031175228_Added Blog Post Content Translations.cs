using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Awdware.Blog.Data.Implementation.Migrations
{
    public partial class AddedBlogPostContentTranslations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPostTranslation",
                columns: table => new
                {
                    PostId = table.Column<Guid>(nullable: false),
                    Locale = table.Column<string>(nullable: false),
                    ContentKey = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPostTranslation", x => new { x.PostId, x.Locale, x.ContentKey });
                    table.ForeignKey(
                        name: "FK_BlogPostTranslation_BlogPosts_PostId",
                        column: x => x.PostId,
                        principalTable: "BlogPosts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPostTranslation");
        }
    }
}
