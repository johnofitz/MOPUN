#nullable disable

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MOPUN.Models
{
  
    [Table("VehicleTrips")]
    public class VehicleTrips
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TripId { get; set; }
        [Required]
        public string Registration { get; set;}
    }
}
