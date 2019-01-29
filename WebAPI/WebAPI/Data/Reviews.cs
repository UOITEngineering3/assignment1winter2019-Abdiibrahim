using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebAPI.Data
{
    public class Reviews
    {
        [Key]
        public int reviewId { get; set; }
        public string comments { get; set; }
        public int score { get; set; }
        public int fkGameId { get; set; }
        public bool isPlayed { get; set; }
        public bool isCompleted { get; set; }
    }
}
