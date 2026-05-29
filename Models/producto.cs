namespace CrudAvanzado.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Producto
    {
        [Key]
        public int IdProducto { get; set; }

        public string SKU { get; set; } = string.Empty;

        public string NombreProducto { get; set; } = string.Empty;
        public decimal PrecioProducto { get; set; }
        public int StockProducto { get; set; }
        public bool ActivoProducto { get; set; }

        public int IdMarca { get; set; }

        [ForeignKey("IdMarca")]
        public Marca? Marca { get; set; }

        public int IdSubFamilia { get; set; }

        [ForeignKey("IdSubFamilia")]
        public SubFamilia? SubFamilia { get; set; }
    }
}