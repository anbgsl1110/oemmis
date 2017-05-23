using System.Collections.Generic;
using Oem.Data.Enum;
using Oem.Data.ServiceModel;
using Oem.Services.IServices.Order;

namespace Oem.Services.Services.Order
{
    public class PurchaseService : BaseService,IPurchaseService
    {
        public ServiceResult<ServiceStateEnum, T> Select<T>(T t, long id)
        {
            var result = PurchaseProvider.Select(t, id);
            return new ServiceResult<ServiceStateEnum, T> {State = ServiceStateEnum.Success, Data = result};
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(T t, long pageIndex, long pageSize)
        {
            var result = PurchaseProvider.Select(t, pageIndex, pageSize);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum, IEnumerable<T>> Select<T>(IDictionary<string, object> parameters)
        {
            var result = PurchaseProvider.Select<T>(parameters);
            return new ServiceResult<ServiceStateEnum, IEnumerable<T>>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Insert<T>(T t)
        {
            PurchaseProvider.Insert(t);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum, int> InsertWithIdentity<T>(T t)
        {
            var result = PurchaseProvider.InsertWithIdentity(t);
            return new ServiceResult<ServiceStateEnum, int>
            {
                State = ServiceStateEnum.Success,
                Data = result
            };
        }

        public ServiceResult<ServiceStateEnum> Delete<T>(T t, long id)
        {
            PurchaseProvider.Delete(t,id);
            return new ServiceResult<ServiceStateEnum>();
        }

        public ServiceResult<ServiceStateEnum> Update<T>(T t)
        {
            PurchaseProvider.Update(t);
            return new ServiceResult<ServiceStateEnum>();
        }
    }
}