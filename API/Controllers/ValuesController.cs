using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> GetAction()
        {
            var result=await  _context.Values.ToListAsync();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> Get(int id)
        {
            var result=await _context.Values.FindAsync(id);
            return Ok(result);
        }

    }
}