#nullable disable

using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MOPUN.Models
{

    public class Vehicles
    {
        [Key]
        public int Registration { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

       
        public bool Active { get; set; }
    }
}
