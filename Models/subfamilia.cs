using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CrudAvanzado.Models
{
    public class SubFamilia
    {
        [Key]
        public int IdSubFamilia { get; set; }

        public string NombreSubFamilia { get; set; } = string.Empty;

        public int IdFamilia { get; set; }

        [ForeignKey("IdFamilia")]
        public Familia? Familia { get; set; }

        public bool ActivoSubFamilia { get; set; } = true;

        [JsonIgnore]
        public List<Producto> Productos { get; set; } = new();
    }
}