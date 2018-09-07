App.service('OrderService', function ($http, $q) {
    this.SaveOrder = function () {
        return $http.get(
            '/Order/SaveOrder'
        );
    }
    this.SaveOrderProduct = function (Cartitem, Orders_id) {
        var obj = {
            Orders_id: Orders_id,
            PerUnitPrice: Cartitem.PerUnitPrice,
            ProductId: Cartitem.Product.ProductId,
            TotalPrice: Cartitem.TotalPrice,
            TotalQty: Cartitem.TotalQty
        }
       return  $http.post(
            '/Order/SaveOrderProduct',
            JSON.stringify(obj),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    this.SaveOrderProductVarient = function (UserVariantAssign, mOrderProduct_id) {        
        var OrderProductVariantOBJ = {
            OrderProduct_id: mOrderProduct_id,
            VariantAssignPtId: UserVariantAssign.id,
            Qty: UserVariantAssign.Qty,
            ChildCombination: UserVariantAssign.ChildCombination
        }
        return $http.post(
            '/Order/SaveOrderProductVarient',
            JSON.stringify(OrderProductVariantOBJ),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    this.SaveOrderBilling = function (billto, Orders_id) {
        var obj = {
            Orders_id: Orders_id,
            firstName: billto.firstName,
            lastName: billto.lastName,
            country: billto.country,
            state: billto.state,
            city: billto.city,
            address: billto.address
        }
        return $http.post(
            '/Order/SaveOrderBilling',
            JSON.stringify(obj),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    this.SaveOrderShipping = function (shipto, Orders_id) {
        var obj = {
            Orders_id: Orders_id,
            firstName: shipto.firstName,
            lastName: shipto.lastName,
            country: shipto.country,
            state: shipto.state,
            city: shipto.city,
            address: shipto.address
        }
        return $http.post(
            '/Order/SaveOrderShipping',
            JSON.stringify(obj),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
    this.SaveOrderTransaction = function (transaction, Orders_id,amount) {
        var obj = {
            Orders_id: Orders_id,
            "amount": amount,
            "authCode": transaction.authCode,
            "avsResultCode": transaction.avsResultCode,
            "cvvResultCode": transaction.cvvResultCode,
            "cavvResultCode": transaction.cavvResultCode,
            "transId": transaction.transId,
            "transHash": transaction.transHash,
            "accountNumber": transaction.accountNumber,
            "accountType": transaction.accountType
        };
        return $http.post(
            '/Order/SaveOrderTransaction',
            JSON.stringify(obj),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    this.GetOrders = function () {
        return $http.get('/order/GetOrders');
    }
    this.GetOrdersByUser = function (Id) {
        return $http.get('/order/GetOrdersByUser/'+Id);
    }
    this.GetOrderBilling = function (Orders_id) {
        return $http.get('/order/GetOrderBilling/?Orders_id=' + Orders_id);
    }
    this.GetOrderShipping = function (Orders_id) {
        return $http.get('/order/GetOrderShipping/?Orders_id=' + Orders_id);
    }
    this.GetOrderPoducts = function (Orders_id) {
        return $http.get('/order/GetOrderPoducts/?Orders_id=' + Orders_id);
    }
    this.GetOrderPoductsVariants = function (OrderProduct_id) {
        return $http.get('/order/GetOrderPoductsVariants/?OrderProduct_id=' + OrderProduct_id);
    }
    this.GetOrderTransaction = function (Orders_id) {
        return $http.get('/order/GetOrderTransaction/?Orders_id=' + Orders_id);
    }

    this.GetAllOrders = function () {
        let OrderList = [];
        let sv = this;
        var promise = new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                sv.GetOrders().then(function (res) {
                    let Orders = JSON.parse(res.data);
                    Orders.forEach(function (order, i) {
                        var newOrder = {
                            Order_id: order.Order_id,
                            Id: order.Id,
                            ApplicationUser: order.ApplicationUser,
                            DateTime: order.DateTime,
                            status: order.status,
                            OrderProducts: [],
                            Billing: {},
                            Shipping: {},
                            Transaction: {}
                        }
                        sv.GetOrderPoducts(order.Order_id).then(function (res_prod) {
                            let Products = JSON.parse(res_prod.data);
                            let newProductsList = [];
                            Products.forEach(function (product, i) {
                                let newProduct = {
                                    OrderProduct_id: product.OrderProduct_id,
                                    Orders_id: product.Orders_id,
                                    PerUnitPrice: product.PerUnitPrice,
                                    Product: product.Product,
                                    ProductId: product.ProductId,
                                    TotalPrice: product.TotalPrice,
                                    TotalQty: product.TotalQty,
                                    OrderProductVariants: []
                                }
                                sv.GetOrderPoductsVariants(product.OrderProduct_id).then(function (res_OrderProductVariants) {
                                    newProduct.OrderProductVariants = JSON.parse(res_OrderProductVariants.data);
                                    newProductsList.push(newProduct);
                                });
                            });
                            newOrder.OrderProducts = newProductsList;
                            sv.GetOrderBilling(order.Order_id).then(function (res_Billing) {
                                newOrder.Billing = JSON.parse(res_Billing.data)[0];
                            });
                            sv.GetOrderShipping(order.Order_id).then(function (res_shipping) {
                                newOrder.Shipping = JSON.parse(res_shipping.data)[0];
                            });
                            sv.GetOrderTransaction(order.Order_id).then(function (res_trans) {
                                newOrder.Transaction = JSON.parse(res_trans.data)[0];
                            });
                            OrderList.push(newOrder);
                            if (Orders.length - 1 == i) resolve(OrderList);
                        });
                    });
                });
            });
        });
        return promise;
    }
        
    this.GetAllOrdersByUser = function (Id) {
        let OrderList = [];
        let sv = this;
        var promise = new Promise(function (resolve, reject) {
            window.setTimeout(function () {
                sv.GetOrdersByUser(Id).then(function (res) {
                    var Orders = JSON.parse(JSON.parse(res.data));
                    Orders.forEach(function (order, i) {
                        var newOrder = {
                            Order_id: order.Order_id,
                            Id: order.Id,
                            ApplicationUser: order.ApplicationUser,
                            DateTime: order.DateTime,
                            status: order.status,
                            OrderProducts: [],
                            Billing: {},
                            Shipping: {},
                            Transaction: {}
                        }
                        sv.GetOrderPoducts(order.Order_id).then(function (res_prod) {
                            let tempProducts = JSON.parse(res_prod.data);
                            var Products = JSON.parse(JSON.parse(res_prod.data));
                            let newProductsList = [];
                            Products.forEach(function (product, i) {
                                let newProduct = {
                                    OrderProduct_id: product.OrderProduct_id,
                                    Orders_id: product.Orders_id,
                                    PerUnitPrice: product.PerUnitPrice,
                                    Product: product.Product,
                                    ProductId: product.ProductId,
                                    TotalPrice: product.TotalPrice,
                                    TotalQty: product.TotalQty,
                                    OrderProductVariants: []
                                }
                                sv.GetOrderPoductsVariants(product.OrderProduct_id).then(function (res_OrderProductVariants) {
                                    newProduct.OrderProductVariants = JSON.parse(JSON.parse(res_OrderProductVariants.data));
                                    newProductsList.push(newProduct);
                                });
                            });
                            newOrder.OrderProducts = newProductsList;
                            sv.GetOrderBilling(order.Order_id).then(function (res_Billing) {
                                newOrder.Billing = JSON.parse(JSON.parse(res_Billing.data))[0];
                            });
                            sv.GetOrderShipping(order.Order_id).then(function (res_shipping) {
                                newOrder.Shipping = JSON.parse(JSON.parse(res_shipping.data))[0];
                            });
                            sv.GetOrderTransaction(order.Order_id).then(function (res_trans) {
                                newOrder.Transaction = JSON.parse(JSON.parse(res_trans.data))[0];
                            });
                            OrderList.push(newOrder);
                            if (Orders.length - 1 == i) resolve(OrderList);
                        });
                    });
                });
            });
        });
        return promise;
    }

    this.ChangeStatusOrder = function (order, status) {
        order.status = status;
        return $http.post(
            '/Order/ChangeOrderStatus',
            JSON.stringify(order),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
});