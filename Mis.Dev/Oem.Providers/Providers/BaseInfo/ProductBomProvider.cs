using System.Collections.Generic;
using Oem.Providers.IProviders.BaseInfo;

namespace Oem.Providers.Providers.BaseInfo
{
    public class ProductBomProvider : BaseProvider,IProductBomProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}