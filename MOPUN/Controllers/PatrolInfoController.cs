using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MOPUN.Controllers
{
    public class PatrolInfoController : Controller
    {
        // GET: PatrolInfoController
        public ActionResult Index()
        {
            return View();
        }

        // GET: PatrolInfoController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: PatrolInfoController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PatrolInfoController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PatrolInfoController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PatrolInfoController/Edit/5
        [HttpPatch]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: PatrolInfoController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PatrolInfoController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
