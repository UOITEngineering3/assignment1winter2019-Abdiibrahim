using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;

namespace WebAPI
{
    public class cloudContext : DbContext
    {
        public cloudContext(DbContextOptions<cloudContext> options) : base(options)
        {

        }

        public DbSet<Games> Games { get; set; }

        public DbSet<Reviews> Reviews{ get; set; }

    }
}
