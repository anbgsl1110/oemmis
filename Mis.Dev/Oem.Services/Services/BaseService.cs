using Oem.Providers.IProviders.Admin;
using Oem.Providers.Providers.Admin;

namespace Oem.Services.Services
{
    /// <summary>
    /// 服务对象基类
    /// </summary>
    public class BaseService
    {
        protected readonly IUserProvider UserProvider;

        public BaseService()
        {
            UserProvider = new Userprovider();
        }
    }
}