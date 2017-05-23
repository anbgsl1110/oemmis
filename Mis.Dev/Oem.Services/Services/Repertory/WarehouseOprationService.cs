using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Services.IServices.Repertory;

namespace Oem.Services.Services.Repertory
{
    public class WarehouseOprationService : BaseService,IWarehouseOprationService
    {
        public ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id)
        {
            var result = WarehouseOprationProvider.Select(t, id);
            return new ServiceResult<ServiceStateEnum, T> {State = ServiceStateEnum.Success, Data = result};
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize)
        {
            var result = WarehouseOprationProvider.Select(t, pageIndex, pageSize);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters)
        {
            var result = WarehouseOprationProvider.Select<T>(parameters);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Insert<T>(T t)
        {
            WarehouseOprationProvider.Insert(t);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t)
        {
            var result = WarehouseOprationProvider.InsertWithIdentity(t);
            return new ServiceResult<ServiceStateEnum, int>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Delete<T>(T t, long id)
        {
            WarehouseOprationProvider.Delete(t,id);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum> Update<T>(T t)
        {
            WarehouseOprationProvider.Update(t);
            return new ServiceResult<ServiceStateEnum>();
        }
    }
}