using System.Collections.Generic;
using Oem.Providers.IProviders.Order;

namespace Oem.Providers.Providers.Order
{
    public class PurchaseDetailsProvider : BaseProvider,IPurchaseDetailsProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}