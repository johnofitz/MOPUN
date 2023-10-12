using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MOPUN.Migrations
{
    /// <inheritdoc />
    public partial class FKPersonnel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PersonnelTrips_TripId",
                table: "PersonnelTrips",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonnelTrips_TripTickets_TripId",
                table: "PersonnelTrips",
                column: "TripId",
                principalTable: "TripTickets",
                principalColumn: "TripId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonnelTrips_TripTickets_TripId",
                table: "PersonnelTrips");

            migrationBuilder.DropIndex(
                name: "IX_PersonnelTrips_TripId",
                table: "PersonnelTrips");
        }
    }
}
