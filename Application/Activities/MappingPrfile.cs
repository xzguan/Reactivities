using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingPrfile : Profile
    {
        public MappingPrfile() 
        {
            CreateMap<Activity,ActivityDto>();
            CreateMap<UserActivity, UserActivityDto>()
                .ForMember(dest => dest.UserName, act =>act.MapFrom(src=>src.AppUser.UserName))
                .ForMember(dest=>dest.DisplayName, act =>act.MapFrom(src =>src.AppUser.DisplayName));
        }
    }
}