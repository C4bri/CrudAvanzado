using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CrudAvanzado.Models
{
    public class Familia
    {
        [Key]
        public int IdFamilia { get; set; }

        public string NombreFamilia { get; set; } = string.Empty;

        public bool ActivoFamilia { get; set; } = true;

        [JsonIgnore]
        public List<SubFamilia> SubFamilias { get; set; } = new();
    }
}