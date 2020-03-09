using System.Security.Cryptography.X509Certificates;
using System.ComponentModel;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Identity;
using Domain;
using Application.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using System;
using Application.Validators;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string  Email { get; set; }
            public string Password { get; set; }

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Password).NotEmpty().Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context,UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }
            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic goes here
                if(await _context.Users.Where( x => x.Email==request.Email).AnyAsync()){
                    throw new RestException(HttpStatusCode.BadRequest,new { Email = "Email Already Exist"});
                }
                if(await _context.Users.Where( x => x.UserName==request.UserName).AnyAsync()){
                    throw new RestException(HttpStatusCode.BadRequest,new { UserName = "UserName Already Exist"});
                }
                var user=new AppUser {
                    DisplayName=request.DisplayName,
                    Email=request.Email,
                    UserName=request.UserName,
                    
                };
                var result=await _userManager.CreateAsync(user,request.Password);
                if(result.Succeeded){
                    return new User{
                        DisplayName=user.DisplayName,
                        Token=_jwtGenerator.CreateToken(user),
                        UserName=user.UserName,
                        Image=null

                    };
                }
                throw new Exception("Problem creating user");
            }
        }
    }
}