namespace MOPUN.Models
{
    public class JwtResponse
    {
        public string Token { get; set; }
        public long Id { get; set; }
        public string Username { get; set; }
        public List<string> Roles { get; set; }
       
    }
}
