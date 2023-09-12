using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MOPUN.Models;

namespace MOPUN.Data
{
    public class MOPUNDB : DbContext
    {
        public MOPUNDB(DbContextOptions<MOPUNDB> options)
            : base(options)
        {
        }
        public DbSet<Accounts> Accounts { get; set; } = default!;

    }
}
