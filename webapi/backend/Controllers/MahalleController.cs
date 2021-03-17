using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MahalleController : ControllerBase
    {
        private readonly TasinmazContext _context;
        public MahalleController(TasinmazContext context)
        {
            _context = context;
        }
        [HttpGet("GetMahalleler")]
        public async Task<IActionResult> GetMahalleler()
        {
            var mahalleler = await _context.Mahalleler.ToListAsync();
                return Ok(mahalleler);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMahalle(int id)
        {
            var k = await _context.Mahalleler.FirstOrDefaultAsync(i=>i.Id==id);
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }

        [HttpGet("GeMahalleById/{ilceId}")]
        public ActionResult<List<Mahalle>> GetIlceById(int ilceId)
        {
            var k =  _context.Mahalleler.Where(i=>i.IlceId==ilceId)
            .Select(a=> new {a.Id,a.Ad});
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }
        [HttpPost]
        public async Task<IActionResult> CreateMahalle(Mahalle mahalle)
        {
            _context.Mahalleler.Add(mahalle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof (GetMahalle),new {id=mahalle.Id},mahalle);
        }
    }
}