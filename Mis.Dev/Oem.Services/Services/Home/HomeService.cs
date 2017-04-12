using System;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Services.IServices.Home;

namespace Oem.Services.Services.Home
{
    public class HomeService : IHomeService
    {
        public ServiceResult<ServiceStateEnum, long> GetTimeDvalue(long clientTime)
        {
            long serviceTime = (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 100000;
            return ServiceResult.Create(ServiceStateEnum.Success, serviceTime - clientTime - 500);
        }
    }
}
