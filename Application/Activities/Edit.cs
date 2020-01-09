using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; } 
            public string Title { get; set; }   
            public string Description { get; set; }
            public string  Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
               _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               var instance=await _context.Activities.FindAsync(request.Id);
               if(instance==null) 
                    throw new RestException(HttpStatusCode.NotFound,new {Activity="Not Found"});

               instance.Title=request.Title?? instance.Title;
               instance.Description=request.Description?? instance.Description;
               instance.Category=request.Category?? instance.Category;
               instance.Date=request.Date ?? instance.Date; 
               instance.City=request.City?? instance.City;
               instance.Venue=request.Venue?? instance.Venue;

               //create an instance here
        
               var success=await _context.SaveChangesAsync()>0;
               if(success) return Unit.Value;
               throw new Exception("Problem saving changes"); 
            }
        }
    }
}