using System.Threading.Tasks;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IlController : ControllerBase
    {
        private readonly TasinmazContext _context;
        public IlController(TasinmazContext context)
        {
            _context = context;
        }
        [HttpGet("GetIller")]
        public async Task<IActionResult> GetIller()
        {
            var iller = await _context.Iller.ToListAsync();
                return Ok(iller);
        }
        [HttpGet("{id}")]
      
        public async Task<IActionResult> GetIl(int id)
        {
            var k = await _context.Iller.FirstOrDefaultAsync(i=>i.Id==id);
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }
        [HttpPost]
        public async Task<IActionResult> CreateIl(Il il)
        {
            _context.Iller.Add(il);
            await _context.SaveChangesAsync();
        // await logController.CreateLog(il);
            return CreatedAtAction(nameof (GetIl),new {id=il.Id},il);
        }
    }
}