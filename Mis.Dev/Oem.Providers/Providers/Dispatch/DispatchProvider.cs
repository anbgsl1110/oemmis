using System.Collections.Generic;
using Oem.Providers.IProviders.Dispatch;

namespace Oem.Providers.Providers.Dispatch
{
    public class DispatchProvider : BaseProvider,IDispatchProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}