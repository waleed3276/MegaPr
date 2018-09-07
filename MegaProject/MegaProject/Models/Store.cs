using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MegaProject.Models
{
    public class Store
    {
        [Key]
        public int StoreId { get; set; }

        public string StoreTypes { get; set; }

        public string Id { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

        public string StoreName { get; set; }

        public string StoreOwnerName { get; set; }

        public string StoreNumber { get; set; }

        public string StoreOwnerNumber { get; set; }

        public string StoreLogo { get; set; }

        public DateTime StoreDate { get; set; }

        public string StoreAddress { get; set; }

        public bool Status { get; set; }

    }
}