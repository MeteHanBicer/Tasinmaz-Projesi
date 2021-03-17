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
    public class TasinmazController : ControllerBase
    {
        private readonly TasinmazContext _context;
        public TasinmazController(TasinmazContext context)
        {
            _context = context;
        }
         [HttpGet("getTasinmazSearch/{search}")]
        public PageResult<Tasinmaz> GetTasinmazlar1(string search,int? page, int pagesize = 5)
        {
             
            var countDetails = _context.Tasinmazlar.Count();
               var  result = new PageResult<Tasinmaz> {
                   Search=search,
                 Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 5,
                 Items = _context.Tasinmazlar.Include(x=>x.Mahalle).ThenInclude(x=>x.Ilce).ThenInclude(x=>x.Il).Where(s => s.Ada.ToString().Contains(search)
                 || s.Parsel.ToString().Contains(search) || s.Nitelik.ToString().Contains(search)
                 || s.Mahalle.Ilce.Il.Ad.ToLower().Contains(search) || s.Mahalle.Ilce.Ad.ToLower().Contains(search) 
                 || s.Mahalle.Ad.ToLower().Contains(search)).OrderByDescending(a => a.Id).Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
    }; 
             return result;
        }
         [HttpGet("getTasinmaz")]
        public PageResult<Tasinmaz> GetTasinmazlar(int? page, int pagesize = 5)
        {
            var countDetails = _context.Tasinmazlar.Count();
               var result = new PageResult<Tasinmaz> {
                 Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 5,
                 Items = _context.Tasinmazlar.Include(x=>x.Mahalle).ThenInclude(x=>x.Ilce).ThenInclude(x=>x.Il).OrderBy(a => a.Mahalle.Ilce.Il.Id).Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
     };
             return result;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTasinmaz(int id)
        {
            var k = await _context.Tasinmazlar.Include(x=>x.Mahalle).ThenInclude(x=>x.Ilce).ThenInclude(x=>x.Il).FirstOrDefaultAsync(i=>i.Id==id);
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }
        [HttpPost]
         public async Task<IActionResult> CreateTasinmaz(Tasinmaz tasinmaz)
        {
             Log log = new Log();
            log.IslemTipi="Taşınmaz Ekleme";
            log.Aciklama="Taşınmaz Eklendi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            _context.Tasinmazlar.Add(tasinmaz);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof (GetTasinmaz),new {id=tasinmaz.Id},tasinmaz);
        }
        [HttpPut("UpdateTasinmaz/{id}")]
        public async Task<IActionResult> UpdateTasinmaz(int id,Tasinmaz t)
        {
            if(id!=t.Id)
            {
                 Log log = new Log();
            log.IslemTipi="Taşınmaz Güncelleme";
            log.Aciklama="Taşınmaz Güncellenemedi";
            log.Durum="Başarısız";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
                return BadRequest();
            }
            var tasinmaz = await _context.Tasinmazlar.FindAsync(id);
            var mahalle = await _context.Mahalleler.FindAsync(tasinmaz.MahalleId);
            var ilce = await _context.Ilceler.FindAsync(mahalle.IlceId);
            var il = await _context.Iller.FindAsync(ilce.IlId);
            if(tasinmaz==null)
            {
                 Log log = new Log();
            log.IslemTipi="Taşınmaz Güncelleme";
            log.Aciklama="Taşınmaz Güncellenemedi";
            log.Durum="Başarısız";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
                return NotFound();
            }
            tasinmaz.Ada=t.Ada;
            tasinmaz.Parsel=t.Parsel;
            tasinmaz.Nitelik=t.Nitelik;
            tasinmaz.MahalleId=t.MahalleId;
            try
            {
                 Log log = new Log();
            log.IslemTipi="Taşınmaz Güncelleme";
            log.Aciklama="Taşınmaz Başarıyla Güncellendi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                 Log log = new Log();
            log.IslemTipi="Taşınmaz Güncelleme";
            log.Aciklama="Taşınmaz Güncellenemedi";
            log.Durum="Başarısız";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
                return NotFound();
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTasinmaz(int id)
        {
                 Log log = new Log();
            var tasinmaz = await _context.Tasinmazlar.FindAsync(id);
            if(tasinmaz==null)
            {
            log.IslemTipi="Taşınmaz Sime";
            log.Aciklama="Taşınmaz Başarıyla Silinemedi";
            log.Durum="Başarısız";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
                return NotFound();
            }
            log.IslemTipi="Taşınmaz Sime";
            log.Aciklama="Taşınmaz Başarıyla Silindi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            _context.Tasinmazlar.Remove(tasinmaz);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}