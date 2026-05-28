using Microsoft.EntityFrameworkCore;
using CrudAvanzado.Models;

namespace CrudAvanzado.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Marca> Marcas { get; set; }

        // 👇 ACA AGREGÁS ESTO
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Producto>()
                .Property(p => p.PrecioProducto)
                .HasPrecision(18, 2);
        }
    }
}