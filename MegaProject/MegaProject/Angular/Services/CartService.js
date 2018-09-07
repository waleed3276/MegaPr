
App.service('CartService', function ($http, $q) {

   
   
    function InUserVariantAssign(UserVariantAssignPtId, UserVariantAssign) {
        var ret = { status: false, index: 0 };
        UserVariantAssign.forEach(function (UserVariantAssign, index) {
            if (UserVariantAssign.id == UserVariantAssignPtId) {
                ret.status = true;
                ret.index = index;
            }
        });
        return ret;
    }
    function Get_ShopProductVariant(ShopProductVariant, UserVariantAssignPtId) {
        let obj_ShopProductVariant = {};
        try {
            ShopProductVariant.forEach(function (item) {
                if (item.ShopProductcombination == UserVariantAssignPtId) {
                    obj_ShopProductVariant = item;
                    throw BreakException;
                }
            });
        } catch (e) {
            return obj_ShopProductVariant;
        }     
        
    }
  

    this.GetCartList=function() {
        var CartList = [];
        CartList = JSON.parse(localStorage.getItem('CartList'));
        return (!CartList || CartList == null) ? [] : CartList;
    }   
    this.CalculateCart = function (CartList) {
        CartList.forEach(function (item) {
            var qty = 0;
            item.UserVariantAssign.forEach(function (UserVariantAssign) {
                qty += UserVariantAssign.Qty;
            });
            item.TotalPrice = item.PerUnitPrice * qty;
            item.TotalQty = qty;
        });

        localStorage.setItem('CartList', JSON.stringify(CartList));
    }
    this.CalculateCart2 = function (CartList,obj) {
        CartList.forEach(function (item) {
            var qty = 0;
            item.UserVariantAssign.forEach(function (UserVariantAssign) {
                qty += UserVariantAssign.Qty;
            });
            item.TotalPrice = item.PerUnitPrice * qty;
            item.TotalQty = qty;
            if (obj.ShopProduct_chId == item.ShopProduct_chId) {
                obj.ShopProductVariant[obj.ShopProductVariant_Index].ShopProduct_CartQty = item.TotalQty;
            }
        });

        localStorage.setItem('CartList', JSON.stringify(CartList));
    }
    this.AddtoCart = function (obj) {
        var invoked = false;
        var CartList = [];
        CartList = this.GetCartList();
        CartList.forEach(function (Cartitem) {
            if (obj.ShopProduct_chId == Cartitem.ShopProduct_chId) {
                var ret = InUserVariantAssign(obj.UserVariantAssignPtId, Cartitem.UserVariantAssign);                                
                let ShopProductVariant_cart = Get_ShopProductVariant(Cartitem.ShopProductVariant, obj.UserVariantAssignPtId);
               // let CartQty = Cartitem.TotalQty;
                let TotalQty = ShopProductVariant_cart.ShopProduct_Qty - ShopProductVariant_cart.ShopProduct_CartQty;
                if (ret.status) {
                    let mUserVariantAssign = Cartitem.UserVariantAssign[ret.index];
                    //let CartQty = mUserVariantAssign.Qty;
                    if (obj.Qty <= TotalQty) {
                        mUserVariantAssign.Qty += obj.Qty;
                    }                   
                    Cartitem.UserVariantAssign[ret.index] = mUserVariantAssign;
                } else {
                    if (obj.Qty <= TotalQty) {
                        var UserVariantAssign_obj = { id: obj.UserVariantAssignPtId, ChildCombination: obj.VariantAssignPt_ChildComination, Qty: obj.Qty };
                        Cartitem.UserVariantAssign.push(UserVariantAssign_obj);                       
                    }                  
                }
                invoked = true;
                return;
            }       
            
        });
        if (!invoked) {
            var CartItem = {
                Product: obj.Product,
                ProductImages: obj.ProductImages,
                PerUnitPrice: obj.PublicPrice,
                TotalPrice: 0,
                TotalQty: 0,
                ShopProductVariant: obj.ShopProductVariant,
                ShopProductVarientss: obj.ShopProductVarientss,
                ShopProduct_chId: obj.ShopProduct_chId,
                ShopProduct_ptId: obj.ShopProduct_ptId,
                UserVariantAssign: [{ id: obj.UserVariantAssignPtId, ChildCombination: obj.VariantAssignPt_ChildComination, Qty: obj.Qty }]
            };
            CartList.push(CartItem);
        }
        this.CalculateCart2(CartList,obj);
    }
    this.UpdateVarientQty = function ( index,varientIndex,CartItem_this,CartList) {
        //var CartList = [];
        //CartList = this.GetCartList();
        //var Cart_Obj = CartList[index];
        var UserVariantAssign_this = CartItem_this.UserVariantAssign[varientIndex];
        var ShopProductVariant = Get_ShopProductVariant(CartItem_this.ShopProductVariant, UserVariantAssign_this.id);
        if (UserVariantAssign_this.Qty.length == 0) {
            UserVariantAssign_this.Qty = 1;
        }
        else if (UserVariantAssign_this.Qty <= 0) {
            CartItem_this.UserVariantAssign.splice(varientIndex, 1);
            if (CartItem_this.UserVariantAssign.length == 0) {
                CartList.splice(index, 1);
            }
        }
        else if ((ShopProductVariant.ShopProduct_Qty - ShopProductVariant.ShopProduct_SoldQty) >= UserVariantAssign_this.Qty) {

        }
        else if ((ShopProductVariant.ShopProduct_Qty - ShopProductVariant.ShopProduct_SoldQty) < UserVariantAssign_this.Qty){
            UserVariantAssign_this.Qty = ShopProductVariant.ShopProduct_Qty - ShopProductVariant.ShopProduct_SoldQty;
            if (UserVariantAssign_this.Qty <= 0) {
                CartItem_this.UserVariantAssign.splice(varientIndex, 1);
                if (CartItem_this.UserVariantAssign.length == 0) {
                    CartList.splice(index, 1);
                }
            }
        }
        this.CalculateCart(CartList);
    }
    this.RemoveCartAt = function (index) {
        var CartList = [];
        CartList = this.GetCartList();
        CartList.splice(index, 1);
        this.CalculateCart(CartList);
    }
    this.RemoveCartvarientAt = function (index,varientIndex) {
        var CartList = [];
        CartList = this.GetCartList();
        var Cart_Obj = CartList[index];
        Cart_Obj.UserVariantAssign.splice(varientIndex,1);
        if (Cart_Obj.UserVariantAssign.length == 0) {
            CartList.splice(index, 1);
        } else {
            CartList[index] = Cart_Obj;
        }
        this.CalculateCart(CartList);
    }
    this.AddtoCartQuick = function (obj) {
        obj.UserVariantAssignPtId = obj.ShopProductVariant[obj.ShopProductVariant_Index].ShopProductcombination;
        obj.ShopProductVarientss.forEach(function (item) {
            if (obj.UserVariantAssignPtId == item.VariantAssignPtId) {
                obj.VariantAssignPt_ChildComination = item.VariantAssignPt_ChildComination;
            }
        });
        obj.Qty = 1;
        this.AddtoCart(obj);
    }
    this.ClearCart = function () {
        localStorage.setItem('CartList', JSON.stringify([]));
    }
        
    
    // Return public API.
  
});