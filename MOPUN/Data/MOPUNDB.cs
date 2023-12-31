﻿using Microsoft.EntityFrameworkCore;
using MOPUN.Models;

namespace MOPUN.Data
{
    public class MOPUNDB : DbContext
    {
        public MOPUNDB(DbContextOptions<MOPUNDB> options): base(options){}
        
        public DbSet<Accounts> Accounts { get; set; } = default!;

        public DbSet<TripTickets> TripTickets {get; set;} = default!;

        public DbSet<PersonnelTrips> PersonnelTrips {get; set;} = default!;

        public DbSet<VehicleTrips> VehicleTrips { get; set;} = default!;

        public DbSet<Vehicles> Vehicles { get; set; } = default!;

        public DbSet<Personnel> Personnel { get; set; } = default!;

        public DbSet<MessageLog> MessageLog { get; set; }= default!;

  
    }
}
