using System.Collections.Generic;
using Oem.Providers.IProviders.SysSetting;

namespace Oem.Providers.Providers.SysSetting
{
    public class LogProvider : BaseProvider,ILogProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}