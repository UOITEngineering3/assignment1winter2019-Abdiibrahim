using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebAPI.Data
{
    public class Games
    {
        [Key]
        public int gameId { get; set; }
        public string name { get; set; }
        public DateTime releaseDate { get; set; }
        public string genre { get; set; }
    }
}
