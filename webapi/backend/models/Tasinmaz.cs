using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    public class Tasinmaz
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Ada { get; set; }
        public int Parsel { get; set; }
        public int Nitelik { get; set; }
        [ForeignKey("MahalleId")]
        public int MahalleId { get; set; }
        public Mahalle Mahalle { get; set; }
    }
}