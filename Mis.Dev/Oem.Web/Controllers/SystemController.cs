using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Oem.Data.Table.OrgStructure;
using Oem.Data.Table.SysSetting;
using Oem.Services.Services.SysSetting;
using Oem.Services.Services.User;

namespace Oem.Web.Controllers
{
    public class SystemController : BaseController
    {
        #region 角色

        /// <summary>
        /// 角色
        /// </summary>
        /// <returns></returns>
        public IActionResult OemRole()
        {
            return View();
        }

        #endregion

        #region 用户

        /// <summary>
        /// 用户管理
        /// </summary>
        /// <returns></returns>
        public IActionResult UserManagement()
        {
            UserService service = new UserService();
            var userListResult = service.Select(new UserRepo(),0,1000).Data.ToList();
            var users = userListResult.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.Users = users;
            
            return View();
        }

        /// <summary>
        /// 用户管理添加
        /// </summary>
        /// <returns></returns>
        public IActionResult UserManagementAdd(long id)
        {
            return View();
        }
        
        /// <summary>
        /// 添加用户
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddUserManagement(UserRepo user)
        {
            user.Password = "abc123";
            
            UserService service = new UserService();
            var result = service.Insert(user);

            return Json(result);
        }

        #endregion

        #region 日志

        /// <summary>
        /// 日志
        /// </summary>
        /// <returns></returns>
        public IActionResult Log()
        {
            LogService service = new LogService();
            var logListResult = service.Select(new LogRepo(),0,1000).Data.ToList();
            var logs = logListResult.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.Logs = logs;
            
            return View();
        }

        #endregion
    }
}