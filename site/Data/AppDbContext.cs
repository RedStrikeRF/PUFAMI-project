using Microsoft.EntityFrameworkCore;
using PUFAMI_Project.BLL.Models;

namespace PUFAMI_Project.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
