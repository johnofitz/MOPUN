using Microsoft.EntityFrameworkCore;
using MOPUN.Models;

namespace MOPUN.Data
{
    public class MOPUNDB : DbContext
    {
        public MOPUNDB(DbContextOptions<MOPUNDB> options): base(options){}
        
        public DbSet<Accounts> Accounts { get; set; } = default!;

        public DbSet<TripTickets> TripTickets {get; set;} = default!;

  
    }
}
