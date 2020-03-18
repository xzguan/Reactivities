using System.Data;
using System;
using System.Net.Mime;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;


namespace API.Controllers
{
    
    public class ActivitiesController : BaseController
    {
       
        [HttpGet]
       
        public async Task<ActionResult<List<ActivityDto>>> List(){
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        
        public async Task<ActionResult<ActivityDto>> Details(Guid id){
            return await Mediator.Send(new Details.Query {Id=id} );
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody]Create.Command command){
           
            return  await Mediator.Send(command);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command){
            command.Id=id;
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id){
            // var command=new Delete.Command();
            // command.Id=id;
            return await Mediator.Send(new Delete.Command{Id=id});
        }
    }
}