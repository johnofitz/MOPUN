#nullable disable

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MOPUN.Models
{
    [Table("Personnel")]
    public class Personnel
    {
        [Key]
        public int MiNumber { get; set; }

        public string BunkerNum { get; set; }

        public string FirstName { get; set;}

        public string LastName { get; set;}

        public string Rank { get; set;}

        public string BloodGp { get; set;}

        public string Gender { get; set;}

        public bool Active { get; set;}

    }
}
