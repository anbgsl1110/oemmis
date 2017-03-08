using System.Collections.Generic;
using NUnit.Framework;
using Oem.Data.Table;
using Oem.IProviders.Admin;
using Oem.Providers.Admin;

namespace Oem.WebTest.IProvider.Admin
{
    public class UserProviderTest
    {
        private readonly IUserProvider _provider;

        public UserProviderTest()
        {
            _provider = new Userprovider();
        }
        /// <summary>
        /// 测试获取数据
        /// </summary>
        /// <returns></returns>
        [Test]
        public void GetUserList()
        {
            List<UserRepo> userList = _provider.GetUserList();
            Assert.NotNull(userList);
        }
    }
}