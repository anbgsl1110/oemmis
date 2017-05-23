using System.Collections.Generic;
using Oem.Providers.IProviders.Repertory;

namespace Oem.Providers.Providers.Repertory
{
    public class WarehouseOprationProvider : BaseProvider,IWarehouseOprationProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}