using System.Collections.Generic;
using Oem.Providers.IProviders.Order;

namespace Oem.Providers.Providers.Order
{
    public class RequisitionDetailsProvider : BaseProvider,IRequisitionDetailsProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}