using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CrudAvanzado.Models
{
    public class Marca
    {
        [Key]
        public int IdMarca { get; set; }

        public string NombreMarca { get; set; } = string.Empty;

        [JsonIgnore]
        public List<Producto> Productos { get; set; } = new();
    }
}