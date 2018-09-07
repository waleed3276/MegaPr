using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MegaProject.Models;
using System.Web.Script.Serialization;
using System.IO;

namespace MegaProject.Controllers
{
    public class StoresController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }

        // GET: Stores/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }

        // GET: Stores/Create
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Get_Data(int StoreId)
        {
            var obj = db.Stores.Find(StoreId);
            return Json(obj, JsonRequestBehavior.AllowGet);
        }


        // POST: Stores/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        
        public ActionResult Create( Store store)
        {
           
                
                return RedirectToAction("Index");
           

            
        }

        // GET: Stores/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }

        // POST: Stores/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "StoreId,StoreName,StoreOwnerName,StoreNumber,StoreOwnerNumber,StoreDate,StoreAddress,Status")] Store store)
        {
            if (ModelState.IsValid)
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(store);
        }

        // GET: Stores/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Store store = db.Stores.Find(id);
            if (store == null)
            {
                return HttpNotFound();
            }
            return View(store);
        }

        [HttpPost]
        public JsonResult Insert(FormCollection form)
        {
            int product_id = 0;
            try
            {
                var js = new JavaScriptSerializer();
                Store store = js.Deserialize<Store>(form["Store"]);
                store.Id = Session["StoreUserId"].ToString();
                store.StoreLogo = Session["ImageS"].ToString();
                //StoreType StoreType= JsonConvert.DeserializeObject<StoreType>(form["StoreType"]);
                store.StoreDate = DateTime.Now;
                store.Status = true;
                db.Stores.Add(store);
                db.SaveChanges();
                product_id = db.Stores.Max(m => m.StoreId);

            }
            catch (Exception ex)
            {

            }

            return Json(product_id, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult StoreImage(FormCollection form)
        {
            var js = new JavaScriptSerializer();
            try
            {
                var ProductImage = Request.Files[0];
                if (ProductImage != null)
                {
                    string filename = Guid.NewGuid() + Path.GetExtension(ProductImage.FileName);
                    ProductImage.SaveAs(Path.Combine(Server.MapPath("~/Content/Store/Images"), filename));
                    return new JsonResult { Data = new { filename = filename } };
                }
            }
            catch (Exception ex)
            { }
            return new JsonResult { Data = new { filename = string.Empty } };
        }

        [HttpPost]
        public ContentResult Upload()
        {
            string path = Server.MapPath("~/Content/Images/");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            foreach (string key in Request.Files)
            {
                HttpPostedFileBase postedFile = Request.Files[key];
                postedFile.SaveAs(path + postedFile.FileName);
                Session["ImageS"] =  postedFile.FileName;
            }

            return Content("Success");
        }

        [HttpPost]
        public JsonResult AssignImagetoStore(FormCollection form)
        {
            try
            {
                int StoreId = Convert.ToInt32(form["StoreId"].ToString());
                string type = form["type"].ToString();
                var product = db.Stores.Find(StoreId);
                if (product != null)
                {

                    product.StoreLogo = form["imageName"].ToString();

                    db.Entry(product).State = EntityState.Modified;
                    db.SaveChanges();
                    var ret = Json(true, JsonRequestBehavior.AllowGet);
                    return ret;
                }


            }
            catch (Exception ex)
            {
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        // POST: Stores/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Store store = db.Stores.Find(id);
            db.Stores.Remove(store);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public void Update_Store(FormCollection form)
        {

                
        }

        public JsonResult GetStore()
        {
            var Stores = db.Stores.ToList();

            return Json(Stores, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
