using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Services.IServices.User;

namespace Oem.Services.Services.SysSetting
{
    public class LogService : BaseService,ILogService
    {
        public ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id)
        {
            var result = LogProvider.Select(t, id);
            return new ServiceResult<ServiceStateEnum, T> {State = ServiceStateEnum.Success, Data = result};
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize)
        {
            var result = LogProvider.Select(t, pageIndex, pageSize);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters)
        {
            var result = LogProvider.Select<T>(parameters);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Insert<T>(T t)
        {
            LogProvider.Insert(t);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t)
        {
            var result = LogProvider.InsertWithIdentity(t);
            return new ServiceResult<ServiceStateEnum, int>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Delete<T>(T t, long id)
        {
            LogProvider.Delete(t,id);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum> Update<T>(T t)
        {
            LogProvider.Update(t);
            return new ServiceResult<ServiceStateEnum>();
        }
    }
}