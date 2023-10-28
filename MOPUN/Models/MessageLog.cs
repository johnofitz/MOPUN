namespace MOPUN.Models
{
    public class MessageLog
    {
        public int Id { get; set; }
        public string? CallSign { get; set; }
        public string? Message { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
    }
}
