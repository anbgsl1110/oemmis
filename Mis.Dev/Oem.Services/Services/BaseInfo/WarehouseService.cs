using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Services.IServices.BaseInfo;

namespace Oem.Services.Services.BaseInfo
{
    public class WarehouseService : BaseService,IWarehouseService
    {
        public ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id)
        {
            var result = WarehouseProvider.Select(t, id);
            return new ServiceResult<ServiceStateEnum, T> {State = ServiceStateEnum.Success, Data = result};
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize)
        {
            var result = WarehouseProvider.Select(t, pageIndex, pageSize);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters)
        {
            var result = WarehouseProvider.Select<T>(parameters);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Insert<T>(T t)
        {
            WarehouseProvider.Insert(t);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t)
        {
            var result = WarehouseProvider.InsertWithIdentity(t);
            return new ServiceResult<ServiceStateEnum, int>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Delete<T>(T t, long id)
        {
            WarehouseProvider.Delete(t,id);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum> Update<T>(T t)
        {
            WarehouseProvider.Update(t);
            return new ServiceResult<ServiceStateEnum>();
        }
    }
}