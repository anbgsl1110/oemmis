using System.Collections.Generic;
using Oem.Providers.IProviders.SysSetting;

namespace Oem.Providers.Providers.SysSetting
{
    public class RoleProvider : BaseProvider,IRoleProvider
    {
        public IEnumerable<T> Select<T>(IDictionary<string, object> parameters)
        {
            throw new System.NotImplementedException();
        }
    }
}