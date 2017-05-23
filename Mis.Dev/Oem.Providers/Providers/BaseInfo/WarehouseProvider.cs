using System.Collections.Generic;
using Oem.Providers.IProviders.BaseInfo;

namespace Oem.Providers.Providers.BaseInfo
{
    public class WarehouseProvider : BaseProvider,IWarehouseProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}