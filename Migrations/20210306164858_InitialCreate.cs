using Microsoft.EntityFrameworkCore.Migrations;

namespace EpollApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Polls",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Polls", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "EpollOptions",
                columns: table => new
                {
                    OptID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Option = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Vote = table.Column<int>(type: "INTEGER", nullable: false),
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EpollOptions", x => x.OptID);
                    table.ForeignKey(
                        name: "FK_PollOption_PollOption",
                        column: x => x.ID,
                        principalTable: "Polls",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EpollOptions_ID",
                table: "EpollOptions",
                column: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EpollOptions");

            migrationBuilder.DropTable(
                name: "Polls");
        }
    }
}
