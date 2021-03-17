using System;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {   
        private readonly TasinmazContext _context;
        public LogController(TasinmazContext context)
        {
            _context = context;
        }
        [HttpGet("getLog")]
        public PageResult<Log> GetLoglar(int? page, int pagesize = 5)
        {
               var countDetails = _context.Loglar.Count();
               var result = new PageResult<Log> {
                 Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 5,
                 Items = _context.Loglar.OrderByDescending(a => a.Id).Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
     };
             return result;
        }
        [HttpGet("getLogSearch/{search}")]
        public PageResult<Log> GetLoglar1(string search,int? page, int pagesize = 5)
        {
             
            var countDetails = _context.Loglar.Count();
               var  result = new PageResult<Log> {
                   Search=search,
                 Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 5,
                 Items = _context.Loglar.Where(s => s.Aciklama.ToLower().Contains(search)
                 || s.Durum.ToLower().Contains(search) || s.Ip.ToString().Contains(search)
                 || s.IslemTipi.ToLower().Contains(search) || s.TarihSaat.ToString().Contains(search)).OrderByDescending(a => a.Id).Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
    }; 
             return result;
        }
        [HttpGet]
        public async Task<IActionResult> GetLoglar()
        {
            var loglar = await _context.Loglar.ToListAsync();
                return Ok(loglar);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLog(int id)
        {
            var k = await _context.Loglar.FirstOrDefaultAsync(i=>i.Id==id);
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }
        [HttpPost]
        public async Task<IActionResult> CreateLog(Log log)
        {
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof (GetLog),new {id=log.Id},log);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLog(int id,Log k)
        {
            if(id!=k.Id)
            {
                return BadRequest();
            }
            var log = await _context.Loglar.FindAsync(id);
            if(log==null)
            {
                return NotFound();
            }
            log.Durum=k.Durum;
            log.IslemTipi=k.IslemTipi;
            log.TarihSaat=k.TarihSaat;
            log.Ip=k.Ip;
            log.Aciklama=k.Aciklama;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}