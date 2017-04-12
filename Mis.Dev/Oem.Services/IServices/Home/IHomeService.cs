using Oem.Data.Enum;
using Oem.Data.ServiceModel;

namespace Oem.Services.IServices.Home
{
    public interface IHomeService
    {
        /// <summary>
        /// 获取页面时间和本地时间差
        /// </summary>
        /// <param name="clientTime">页面时间</param>
        /// <returns>时间差值</returns>
        ServiceResult<ServiceStateEnum, long> GetTimeDvalue(long clientTime);
    }
}
