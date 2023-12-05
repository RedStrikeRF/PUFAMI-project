using Microsoft.EntityFrameworkCore;
using PUFAMI_Project.Models;

namespace PUFAMI_Project.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Teacher> Teachers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
