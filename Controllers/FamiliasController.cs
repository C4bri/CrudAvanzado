using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrudAvanzado.Data;
using CrudAvanzado.Models;

namespace CrudAvanzado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamiliasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FamiliasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Familia>>> GetFamilias()
        {
            return await _context.Familias.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Familia>> PostFamilia(Familia familia)
        {
            _context.Familias.Add(familia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFamilias), new { id = familia.IdFamilia }, familia);
        }
    }
}