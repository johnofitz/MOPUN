#nullable disable

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace MOPUN.Models
{
    /// <summary>
    /// Patrol Information model
    /// Using POST, PATCH
    /// </summary>
    [Table("TripTickets")]
    public class TripTickets
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

        
        public DateTime LastDateUpdate {  get; set; } = DateTime.Now.Date;

        public TimeSpan LastTimeUpdate { get; set; } = DateTime.Now.TimeOfDay;



        //    [ForeignKey("TripId")]
        //  public TripTickets ParentTrip { get; set; }

    }
}


