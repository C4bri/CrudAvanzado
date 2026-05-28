using Microsoft.AspNetCore.Mvc;
using CrudAvanzado.Data;
using CrudAvanzado.Models;

namespace CrudAvanzado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarcasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MarcasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Marcas.ToList());
        }

        [HttpPost]
        public IActionResult Post(Marca marca)
        {
            _context.Marcas.Add(marca);
            _context.SaveChanges();
            return Ok(marca);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Marca marca)
        {
            var existente = _context.Marcas.Find(id);
            if (existente == null) return NotFound();

            existente.NombreMarca = marca.NombreMarca;
            _context.SaveChanges();

            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var marca = _context.Marcas.Find(id);
            if (marca == null) return NotFound();

            _context.Marcas.Remove(marca);
            _context.SaveChanges();

            return Ok();
        }
    }
}