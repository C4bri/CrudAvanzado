using Microsoft.AspNetCore.Mvc;
using CrudAvanzado.Data;
using CrudAvanzado.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudAvanzado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos
                .Include(p => p.Marca)
                .Include(p => p.SubFamilia)
                    .ThenInclude(sf => sf!.Familia)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Productos
                .Include(p => p.Marca)
                .Include(p => p.SubFamilia)
                    .ThenInclude(sf => sf!.Familia)
                .FirstOrDefaultAsync(p => p.IdProducto == id);

            if (producto == null)
                return NotFound();

            return producto;
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            var existe = await _context.Productos
                .AnyAsync(p => p.SKU == producto.SKU);

            if (existe)
                return BadRequest("El SKU ya existe. Ingrese uno diferente.");

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.IdProducto }, producto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, Producto producto)
        {
            if (id != producto.IdProducto)
                return BadRequest();

            var existe = await _context.Productos
                .AnyAsync(p => p.SKU == producto.SKU && p.IdProducto != id);

            if (existe)
                return BadRequest("El SKU que intenta modificar ya existe. Ingrese uno diferente.");

            _context.Entry(producto).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}