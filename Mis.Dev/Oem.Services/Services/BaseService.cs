﻿using Oem.Providers.IProviders.Admin;
using Oem.Providers.IProviders.BaseInfo;
using Oem.Providers.Providers.Admin;
using Oem.Providers.Providers.BaseInfo;

namespace Oem.Services.Services
{
    /// <summary>
    /// 服务对象基类
    /// </summary>
    public class BaseService
    {
        protected readonly IUserProvider UserProvider;
        protected readonly OriginalMaterialsProvider OriginalMaterialsProvider;

        public BaseService()
        {
            UserProvider = new Userprovider();
            OriginalMaterialsProvider = new OriginalMaterialsProvider();
        }
    }
}