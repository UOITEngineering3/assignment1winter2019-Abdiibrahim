using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI;
using WebAPI.Data;
using System.Data;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly cloudContext _context;

        public GamesController(cloudContext context)
        {
            _context = context;
        }

        private class tableRow
        {
            public Games game;
            public int confidence;
            public tableRow(int conf, Games game)
            {
                this.game = game;
                this.confidence = conf;
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private DataTable _createTable()
        {
            DataTable table = new DataTable();
            table.Columns.Add("confidence", typeof(int));
            table.Columns.Add("game", typeof(Games));

            return table;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private DataRow _createRow(tableRow row, DataTable data)
        {
            DataRow newRow = data.NewRow();
            newRow["confidence"] = row.confidence;
            newRow["game"] = row.game;
            return newRow;
        }

        /// <summary>
        /// Get all games
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetGames()
        {
            List<Games> gameList = await _context.Games.ToListAsync();
            return Ok(gameList);
        }

        /// <summary>
        /// Get a game by gameId
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [HttpGet("{gameId}")]
        public async Task<IActionResult> GetByID([FromRoute] int gameId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var games = await _context.Games.Where(i => i.gameId == gameId).ToListAsync();

            if (gameId == null)
            {
                return NotFound();
            }

            return Ok(games);
        }
    }
}
