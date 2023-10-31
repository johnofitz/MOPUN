namespace MOPUN.Models
{
    public class MessageDTO
    {

        public string? CallSign { get; set; }
        public string? Message { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
    }
}
