using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;
using Oem.Data.Table.OrgStructure;

namespace Oem.WebTest.Database
{
    public class InitDbContext : DbContext
    {
        public InitDbContext(DbContextOptions<InitDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            //AppSmsConfig
            builder.Entity<OrgRepo>().HasKey(p => new {p.Id});
            builder.Entity<OrgRepo>().Property(p => p.OrgName).HasMaxLength(50);
            builder.Entity<OrgRepo>().Property(p => p.Remark).HasMaxLength(50);
        }
        public DbSet<OrgRepo> Org { get; set; }
    }
}