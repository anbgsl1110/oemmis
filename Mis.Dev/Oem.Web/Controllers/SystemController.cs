using Microsoft.AspNetCore.Mvc;

namespace Oem.Web.Controllers
{
    public class SystemController : Controller
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
            return View();
        }

        /// <summary>
        /// 用户管理添加
        /// </summary>
        /// <returns></returns>
        public IActionResult UserManagementAdd()
        {
            return View();
        }

        /// <summary>
        /// 用户管理编辑
        /// </summary>
        /// <returns></returns>
        public IActionResult UserManagementEdit()
        {
            return View();
        }        

        #endregion

        #region 日志

        /// <summary>
        /// 日志
        /// </summary>
        /// <returns></returns>
        public IActionResult Log()
        {
            return View();
        }

        #endregion
    }
}