using System.Collections.Generic;
using Oem.Data.Table.OrgUser;

namespace Oem.IProviders.Admin
{
    public interface IUserProvider
    {
        List<UserRepo> GetUserList();
    }
}