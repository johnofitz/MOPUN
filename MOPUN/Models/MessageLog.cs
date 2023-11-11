namespace MOPUN.Models
{
    public class MessageLog
    {
        public int Id { get; set; }
        public string? CallSign { get; set; }
        public string? Message { get; set; }
        public DateTime DateOF { get; set; } = DateTime.Now.Date;
        public TimeSpan TimeOF { get; set; } = DateTime.Now.TimeOfDay;

    }
}
