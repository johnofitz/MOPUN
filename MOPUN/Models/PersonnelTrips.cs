#nullable disable

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MOPUN.Models
{
    [Table("PersonnelTrips")]
    public class PersonnelTrips
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string BunkerNum { get; set; }

        [Required]
        public int TripId { get; set; }
    }
}
