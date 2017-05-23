using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Services.IServices.Dispatch;

namespace Oem.Services.Services.Dispatch
{
    public class DispatchService : BaseService,IDispatchService
    {
        public ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id)
        {
            var result = DispatchProvider.Select(t, id);
            return new ServiceResult<ServiceStateEnum, T> {State = ServiceStateEnum.Success, Data = result};
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize)
        {
            var result = DispatchProvider.Select(t, pageIndex, pageSize);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters)
        {
            var result = DispatchProvider.Select<T>(parameters);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Insert<T>(T t)
        {
            DispatchProvider.Insert(t);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t)
        {
            var result = DispatchProvider.InsertWithIdentity(t);
            return new ServiceResult<ServiceStateEnum, int>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Delete<T>(T t, long id)
        {
            DispatchProvider.Delete(t,id);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum> Update<T>(T t)
        {
            DispatchProvider.Update(t);
            return new ServiceResult<ServiceStateEnum>();
        }
    }
}