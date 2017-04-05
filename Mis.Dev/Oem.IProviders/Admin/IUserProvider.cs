using System.Collections.Generic;
using Oem.Data.Table.OrgStructure;

namespace Oem.IProviders.Admin
{
    public interface IUserProvider
    {
        List<UserRepo> GetUserList();
    }
}