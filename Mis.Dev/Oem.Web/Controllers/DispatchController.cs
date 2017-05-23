
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Oem.Common.CacheHelper;
using Oem.Data.Table.Dispatch;
using Oem.Services.Services.Dispatch;

namespace Oem.Web.Controllers
{
    public class DispatchController : BaseController
    {
        /// <summary>
        /// 派工列表
        /// </summary>
        /// <returns></returns>
        public IActionResult DispatchList()
        {
            DispatchService service = new DispatchService();
            var result = service.Select(new 
                DispatchRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        /// <summary>
        /// 派工详情
        /// </summary>
        /// <returns></returns>
        public IActionResult DispatchListDetail()
        {
            return View();
        }

        /// <summary>
        /// 下料皮派工
        /// </summary>
        /// <returns></returns>
        public IActionResult LeatherDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 下料衬里派工
        /// </summary>
        /// <returns></returns>
        public IActionResult ChenliDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 小机器派工
        /// </summary>
        /// <returns></returns>
        public IActionResult MachineDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 生产小组派工
        /// </summary>
        /// <returns></returns>
        public IActionResult GroupDispatchAdd()
        {
            return View();
        }

        /// <summary>
        /// 生产进度列表
        /// </summary>
        /// <returns></returns>
        public IActionResult ProduceProgressList()
        {
            DispatchDetailService service = new DispatchDetailService();
            var result = service.Select(new 
                DispatchDetailRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        /// <summary>
        /// 生产进度详情
        /// </summary>
        /// <returns></returns>
        public IActionResult ProduceProgressDetail()
        {
            return View();
        }

        public DispatchController(ICacheService cacheService) : base(cacheService)
        {
        }
    }
}