using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    public class Log
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Durum { get; set; }
        public string IslemTipi { get; set; }
        public DateTime TarihSaat { get; set; }
        public int Ip { get; set; }
        public string Aciklama { get; set; }
    }
}