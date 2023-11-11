namespace MOPUN.Models
{
    public class TripTicketInfoDTO
    {
        public int TripId { get; set; }
        public string CallSign { get; set; }
        public string Location { get; set; }
        public string LastLocation { get; set; }
        public string Mobile { get; set; }
        public string MotoId { get; set; }
        public string Reason { get; set; }
        public string Priority { get; set; }

        public bool Active { get; set; }

        public bool InCamp {  get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    
        public List<PersonnelDTO> Personnel { get; set; }

        public List<VehicleInfoDTO> Vehicle { get; set; }
    }

}
