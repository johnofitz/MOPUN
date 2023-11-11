namespace MOPUN.Models
{
    using System;
    using System.Collections.Generic;

    public class TripTicketRequest
    {
        public string CallSign { get; set; }
        public string PatrolType { get; set; }
        public string PatrolMobile { get; set; }
        public DateTime PatrolDate { get; set; }
        public string SelectedOption { get; set; }
        public string StartTimes { get; set; }
        public string EndTimes { get; set; }
        public string PatrolMoto { get; set; }
        public string PatrolStartPoint { get; set; }

       
        public List<int> PatrolVehicle { get; set; }
        public List<string> AddPersonnel { get; set; }
    }

}
