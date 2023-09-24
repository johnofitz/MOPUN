using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable
namespace MOPUN.Models
{  
    public class TripTicketCreateDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TripId { get; set; }

        [Required]
        [StringLength(10)]
        public string CallSign { get; set; }

        [Required]
        [StringLength(50)]
        public string Location { get; set; }

        [Required]
        [StringLength(50)]
        public string LastLocation { get; set; }

        [Required]
        [StringLength(15)]
        public string Mobile { get; set; }

        [Required]
        [StringLength(10)]
        public string MotoId { get; set; }

        [Required]
        [StringLength(20)]
        public string Reason { get; set; }

        [Required]
        [StringLength(15)]
        public string Priority { get; set; }

        [Required]
        public DateTime StartDate { get; set; }


        [Required]
        public TimeSpan StartTime { get; set; } 


        [Required]
        public TimeSpan EndTime { get; set; }

    }
}
