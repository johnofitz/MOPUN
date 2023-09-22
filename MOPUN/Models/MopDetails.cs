#nullable disable

namespace MOPUN.Models
{
    /// <summary>
    /// Patrol Information model
    /// Using POST, PATCH
    /// </summary>
    public class MopDetails
    {
        public int TripId { get; set; }

        public string CallSign { get; set; }
        
        public string Location { get; set; }

        public string LastLocation { get; set; }

        public DateTime LastUpdateTime { get; set; }

        public int Phone { get; set; }

        public string Reason { get; set; }

        public string Priorty { get; set; }

        public string MotoId { get; set; }

        public string StartDate { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public bool Active { get; set; }
    }
}
