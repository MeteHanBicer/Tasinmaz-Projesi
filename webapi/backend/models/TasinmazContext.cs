using Microsoft.EntityFrameworkCore;

namespace backend.models
{
    public class TasinmazContext : DbContext
    {
        public TasinmazContext(DbContextOptions<TasinmazContext> options) : base(options)
        {
        }
        public DbSet<Il> Iller { get; set; }
        public DbSet<Ilce> Ilceler { get; set; }
        public DbSet<Mahalle> Mahalleler { get; set; }
        public DbSet<Log> Loglar { get; set; }
        public DbSet<Tasinmaz> Tasinmazlar { get; set; }
        public DbSet<Kullanici> Kullanicilar { get; set; }
    }
}