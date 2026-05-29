using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrudAvanzado.Data;
using CrudAvanzado.Models;

namespace CrudAvanzado.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubFamiliasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubFamiliasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubFamilia>>> GetSubFamilias()
        {
            return await _context.SubFamilias
                .Include(sf => sf.Familia)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<SubFamilia>> PostSubFamilia(SubFamilia subFamilia)
        {
            _context.SubFamilias.Add(subFamilia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubFamilias), new { id = subFamilia.IdSubFamilia }, subFamilia);
        }
    }
}