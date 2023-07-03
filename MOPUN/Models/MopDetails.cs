#nullable disable

namespace MOPUN.Models
{
    public class MopDetails
    {
        public int TripId { get; set; }

        public string CallSign { get; set; }
        
        public string Destination { get; set; }

        public string Location { get; set; }

        public int Phone { get; set; }

        public bool Active { get; set; }


        public int Priorty { get; set; }

        public string MotoId { get; set; }

        public DateOnly DateOnly { get; set; }


        public TimeOnly TimeOnly { get; set; }
    }
}
