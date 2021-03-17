using System;
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
    public class KullaniciController : ControllerBase
    {
        private readonly TasinmazContext _context;
        public KullaniciController(TasinmazContext context)
        {
            _context = context;
        }
        [HttpGet("getKullaniciSearch/{search}")]
        public PageResult<Kullanici> GetKullanicilar1(string search,int? page, int pagesize = 5)
        {
             
            var countDetails = _context.Kullanicilar.Count();
               var  result = new PageResult<Kullanici> {
                   Search=search,
                 Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 5,
                 Items = _context.Kullanicilar.Where(s => s.Ad.ToLower().Contains(search)
                 || s.Soyad.ToLower().Contains(search) || s.Email.ToLower().Contains(search)
                 || s.Sifre.ToLower().Contains(search) || s.Rol.ToLower().Contains(search) 
                 || s.Adres.ToLower().Contains(search)).OrderByDescending(a => a.Id).Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
    }; 
             return result;
        }

 [HttpGet("getKullanici")]
        public PageResult<Kullanici> GetKullanicilar(int? page, int pagesize = 5)
        {
             
            var countDetails = _context.Kullanicilar.Count();
               var  result = new PageResult<Kullanici> {
                 Count = countDetails,
                PageIndex = page ?? 1,
                PageSize = 5,
                 Items = _context.Kullanicilar.OrderByDescending(a => a.Id).Skip((page - 1 ?? 0) * pagesize).Take(pagesize).ToList()
    }; 
             return result;
        }


        [HttpGet("GetKullanicilar")]
        public async Task<IActionResult> GetKullanicilar()
        {
            var kullanicilar = await _context.Kullanicilar.ToListAsync();
                return Ok(kullanicilar);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetKullanici(int id)
        {
            var k = await _context.Kullanicilar.FirstOrDefaultAsync(i=>i.Id==id);
            if (k==null)
            {
                return NotFound();
            }
            return Ok(k);
        }
       
        [HttpGet("LoginCheck/{email}/{sifre}")]
        public async Task<IActionResult> LoginCheckKullanici(string email, string sifre)
        {
             Log log = new Log();
            var k = await _context.Kullanicilar.FirstOrDefaultAsync(i=>i.Email == email && i.Sifre == sifre);
            if (k==null)
            {
            log.IslemTipi="Sisteme Giriş";
            log.Aciklama="Sisteme Giriş Yapılamadı,Böyle Bir Kullanıcı Mevcut Değil";
            log.Durum="Başarısız";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
                return NotFound();
            }
            log.IslemTipi="Sisteme Giriş";
            log.Aciklama=k.Ad + " " + k.Soyad + " Tarafından Sisteme Giriş Yapıldı";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
            return Ok(k);
        }
        [HttpPost]
        public async Task<IActionResult> CreateKullanici(Kullanici k)
        {
             Log log = new Log();
            log.IslemTipi="Kullanıcı Ekleme";
            log.Aciklama="Kullanıcı Başarıyla Eklendi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            _context.Kullanicilar.Add(k);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof (GetKullanici),new {id=k.Id},k);
            
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateKullanici(int id,Kullanici k)
        {
            if(id!=k.Id)
            {
                return BadRequest();
            }
            var kullanici = await _context.Kullanicilar.FindAsync(id);
            if(kullanici==null)
            {
                return NotFound();
            }
            kullanici.Ad=k.Ad;
            kullanici.Soyad=k.Soyad;
            kullanici.Email=k.Email;
            kullanici.Sifre=k.Sifre;
            kullanici.Rol=k.Rol;
            kullanici.Adres=k.Adres;
            try
            {
             Log log = new Log();
            log.IslemTipi="Kullanıcı Güncelleme";
            log.Aciklama="Kullanıcı Başarıyla Güncellendi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                 Log log = new Log();
            log.IslemTipi="Kullanıcı Güncelleme";
            log.Aciklama="Kullanıcı Güncellenemedi";
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
        public async Task<IActionResult> DeleteKullanici(int id)
        {
                  Log log = new Log();

            var kullanici = await _context.Kullanicilar.FindAsync(id);
            if(kullanici==null)
            {
            log.IslemTipi="Kullanıcı Silme";
            log.Aciklama="Kullanıcı Başarıyla Silindi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            await _context.SaveChangesAsync();
                return NotFound();
            }
            log.IslemTipi="Kullanıcı Silme";
            log.Aciklama="Kullanıcı Başarıyla Silindi";
            log.Durum="Başarılı";
            log.Ip=19216812;
            log.TarihSaat=DateTime.Now;
            _context.Loglar.Add(log);
            _context.Kullanicilar.Remove(kullanici);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}