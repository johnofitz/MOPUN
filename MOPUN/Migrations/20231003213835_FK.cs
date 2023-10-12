using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MOPUN.Migrations
{
    /// <inheritdoc />
    public partial class FK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TripTicketRequest");

            migrationBuilder.DropTable(
                name: "TripTicketCreateDTO");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleTrips_TripId",
                table: "VehicleTrips",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleTrips_TripTickets_TripId",
                table: "VehicleTrips",
                column: "TripId",
                principalTable: "TripTickets",
                principalColumn: "TripId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleTrips_TripTickets_TripId",
                table: "VehicleTrips");

            migrationBuilder.DropIndex(
                name: "IX_VehicleTrips_TripId",
                table: "VehicleTrips");

            migrationBuilder.CreateTable(
                name: "TripTicketCreateDTO",
                columns: table => new
                {
                    TripId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CallSign = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    LastLocation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Mobile = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    MotoId = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripTicketCreateDTO", x => x.TripId);
                });

            migrationBuilder.CreateTable(
                name: "TripTicketRequest",
                columns: table => new
                {
                    TripTicketDTOTripId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_TripTicketRequest_TripTicketCreateDTO_TripTicketDTOTripId",
                        column: x => x.TripTicketDTOTripId,
                        principalTable: "TripTicketCreateDTO",
                        principalColumn: "TripId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TripTicketRequest_TripTicketDTOTripId",
                table: "TripTicketRequest",
                column: "TripTicketDTOTripId");
        }
    }
}
