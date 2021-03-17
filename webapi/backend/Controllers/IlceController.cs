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
    public class IlceController : ControllerBase
    {
         private readonly TasinmazContext _context;
        public IlceController(TasinmazContext context)
        {
            _context = context;
        }
        [HttpGet("GetIlceler")]
        public async Task<IActionResult> GetIlceler()
        {
            var ilceler = await _context.Ilceler.ToListAsync();
                return Ok(ilceler);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIlce(int id)
        {
            var k = await _context.Ilceler.FirstOrDefaultAsync(i=>i.Id==id);
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }


        [HttpGet("GetIlceById/{ilId}")]
        public ActionResult<List<Ilce>> GetIlceById(int ilId)
        {
            var k =  _context.Ilceler.Where(i=>i.IlId==ilId)
            .Select(a=> new {a.Id,a.Ad});
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }
         [HttpPost]
        public async Task<IActionResult> CreateIlce(Ilce ilce)
        {
            _context.Ilceler.Add(ilce);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof (GetIlce),new {id=ilce.Id},ilce);
        }
    }
}