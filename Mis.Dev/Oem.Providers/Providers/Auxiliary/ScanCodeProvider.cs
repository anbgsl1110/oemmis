using System.Collections.Generic;
using Oem.Providers.IProviders.Auxiliary;

namespace Oem.Providers.Providers.Auxiliary
{
    public class ScanCodeProvider : BaseProvider,IScanCodeProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}