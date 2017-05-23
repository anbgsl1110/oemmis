using System.Collections.Generic;
using Oem.Providers.IProviders.Dispatch;

namespace Oem.Providers.Providers.Dispatch
{
    public class DispatchDetailProvider : BaseProvider,IDispatchDetailProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}