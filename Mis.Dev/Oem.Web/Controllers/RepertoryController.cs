
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Oem.Data.Table.Repertory;
using Oem.Services.Services.Repertory;

namespace Oem.Web.Controllers
{
    public class RepertoryController : BaseController
    {
        #region 采购入库

        /// <summary>
        /// 入库流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryList()
        {
            WarehouseOprationService service = new WarehouseOprationService();
            var result = service.Select(new 
                WarehouseOprationRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        /// <summary>
        /// 入库流水详情
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryListDetail()
        {
            return View();
        }

        /// <summary>
        /// 入库皮增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryLeatherAdd()
        {
            return View();
        }

        /// <summary>
        /// 入库衬里增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryChenliAdd()
        {
            return View();
        }

        /// <summary>
        /// 入库辅料增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ImportRepertoryFuliaoAdd()
        {
            return View();
        }

        #endregion

        #region 领料出库

        /// <summary>
        /// 出库流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ExportRepertoryList()
        {
            WarehouseOprationService service = new WarehouseOprationService();
            var result = service.Select(new 
                WarehouseOprationRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        /// <summary>
        /// 出库增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ExportRepertoryAdd()
        {
            return View();
        }
        
        /// <summary>
        /// 出库明细
        /// </summary>
        /// <returns></returns>
        public IActionResult ExportRepertoryListDetail()
        {   
            return View();
        }

        #endregion

        #region 碎料返库

        /// <summary>
        /// 返库流水
        /// </summary>
        /// <returns></returns>
        public IActionResult ReturnRepertoryList()
        {
            WarehouseOprationService service = new WarehouseOprationService();
            var result = service.Select(new 
                WarehouseOprationRepo(),0,1000).Data.ToList();
            var list = result.Where(p => p.Id > 0).Take(10).ToList();
            ViewBag.List = list;
            
            return View();
        }

        /// <summary>
        /// 返库增加
        /// </summary>
        /// <returns></returns>
        public IActionResult ReturnRepertoryAdd()
        {
            return View();
        }
        
        /// <summary>
        /// 返库明细
        /// </summary>
        /// <returns></returns>
        public IActionResult ReturnRepertoryListDetail()
        {
            return View();
        }

        #endregion
    }
}