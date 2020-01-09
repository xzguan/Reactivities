using System.Runtime.Intrinsics.X86;
using System.Net;
using System;
using Application.Errors;
using Microsoft.AspNetCore.Http;

using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        
        private readonly RequestDelegate _next;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            this._next = next;
            _logger = logger;
        }
        public async Task Invoke(HttpContext context)
        {
            try{
                await _next(context);
            }
            catch(Exception ex){
                await HandleExceptionAsync(context,ex,_logger);
            }
        }
        private async Task HandleExceptionAsync(HttpContext context,Exception ex,
                ILogger<ErrorHandlingMiddleware> logger){
            object errors=null;
            switch(ex){
                case RestException re:
                    logger.LogError(ex,"REST ERROR");
                    context.Response.StatusCode=(int)re.Code;
                    errors=re.Errors;
                    break;
                case Exception e : 
                    logger.LogError(ex,"SERVER ERROR");
                    context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                    errors=string.IsNullOrEmpty(ex.Message)?"Error":ex.Message;
                    break;
            }
            context.Response.ContentType="application/json";
            if(errors!=null){
                var result=JsonConvert.SerializeObject(new {errors});
                await context.Response.WriteAsync(result);
            }
        }
    }
}