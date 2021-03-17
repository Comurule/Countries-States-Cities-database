const accountServices = require('../services/account');
const brandServices = require('../services/brand');
const productServices = require('../services/product');
const categoryServices = require('../services/category');
const cartServices = require('../services/cart');
const orderServices = require('../services/order');
const paymentServices = require('../services/payment');
const stockServices = require('../services/stock');
const { thankYouMailTo } = require('../utils/sendMail');

let adminController = {};
/******************************************************/
/***************Begin::ACCOUNT RELATE*****************/
/****************************************************/

adminController.register_an_account = async (req, res) => {
    try {
        let result = await accountServices.create_an_account(req.body);
        if (!result) throw new Error();

        if (result.status && req.body.user_type == 'customer') {
            //Send a Thank you Email to the customer
            thankYouMailTo(req.body.email)
                .then(console.log)
                .catch(console.log)
        }

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_account_profile = async (req, res) => {
    try {
        return res.status(200).json({
            status: true,
            message: 'Account Record Details',
            data: req.user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })
    }
};

adminController.update_account_profile = async (req, res) => {
    try {
        const id = req.user.id,
            data = req.body;
        let result = await accountServices.update_an_account(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.update_an_account = async (req, res) => {
    try {
        const id = req.params.id,
            data = req.body;
        let result = await accountServices.update_an_account(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.pend_an_account = async (req, res) => {
    try {
        const id = req.params.id,
            data = { status: 'pending' };
        if (req.query.email) data.email = req.query.email;

        let result = await accountServices.update_an_account(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        result.message = result.status ? 'Account Record Successfully Pending ' : result.message;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.activate_an_account = async (req, res) => {
    try {
        const id = req.params.id,
            data = { status: 'active' };
        if (req.query.email) data.email = req.query.email;

        let result = await accountServices.update_an_account(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        result.message = result.status ? 'Account Record Activated Successfully' : result.message;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.ban_an_account = async (req, res) => {
    try {
        const id = req.params.id,
            data = { status: 'banned' };
        if (req.query.email) data.email = req.query.email;

        let result = await accountServices.update_an_account(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        result.message = result.status ? 'Account Record Banned Successfully' : result.message;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.delete_an_account = async (req, res) => {
    try {
        let result = await accountServices.soft_delete_an_account(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.restore_a_deleted_account = async (req, res) => {
    try {
        let result = await accountServices.restore_a_deleted_account(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.hard_delete_an_account = async (req, res) => {
    try {
        let result = await accountServices.hard_delete_an_account(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_a_requested_account = async (req, res) => {
    try {
        let result = await accountServices.get_an_account({ id: req.params.id });
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_all_requested_account = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        let result = await accountServices.get_all_selected_accounts(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*****************End::ACCOUNT RELATED****************/
/****************************************************/


/******************************************************/
/****************Begin::BRAND RELATED*****************/
/****************************************************/
adminController.create_a_brand = async (req, res) => {
    try {
        const result = await brandServices.create_a_brand(req.body);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.update_a_brand = async (req, res) => {
    try {
        const id = req.params.id,
            data = req.body;
        const result = await brandServices.update_a_brand(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.delete_a_brand = async (req, res) => {
    try {
        const result = await brandServices.delete_a_brand(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_a_brand = async (req, res) => {
    try {
        const result = await brandServices.get_a_brand(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_selected_brands = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        const result = await brandServices.get_all_selected_brands(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*****************End::BRAND RELATED******************/
/****************************************************/


/******************************************************/
/****************Begin::CATEGORY RELATED**************/
/****************************************************/

adminController.create_a_category = async (req, res) => {
    try {
        const result = await categoryServices.create_a_category(req.body);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.update_a_category = async (req, res) => {
    try {
        const id = req.params.id,
            data = req.body;
        const result = await categoryServices.update_a_category(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.delete_a_category = async (req, res) => {
    try {
        const result = await categoryServices.delete_a_category(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_a_category = async (req, res) => {
    try {
        const result = await categoryServices.get_a_category(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_selected_categories = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        const result = await categoryServices.get_all_selected_categories(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*****************End::CATEGORY RELATED***************/
/****************************************************/


/******************************************************/
/****************Begin::PRODUCT RELATED***************/
/****************************************************/

adminController.check_product_available = async (req, res) => {
    try {
        const result = await productServices.is_product_available(req.body.product_name);

        let statusCode, response;
        if (result) {
            statusCode = 200;
            response = { status: true, message: 'Product Name is Available.' };
        } else {
            statusCode = 400;
            response = { status: false, message: 'Product Name is Not Available.' };
        }

        return res.status(statusCode).json(response);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.create_a_product = async (req, res) => {
    try {
        const data = { ...req.body, user: req.user };
        const result = await productServices.create_a_product(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log({error});
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.update_a_product = async (req, res) => {
    try {
        const id = req.params.id,
            data = { ...req.body, user: req.user };
        const result = await productServices.update_a_product(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.delete_a_product = async (req, res) => {
    try {
        const result = await productServices.delete_a_product(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_a_product = async (req, res) => {
    try {
        const result = await productServices.get_a_product(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_selected_products = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        const result = await productServices.get_all_selected_products(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.add_images_to_a_product = async (req, res) => {
    try {
        const id = req.params.id,
            images = req.body.images;
            console.log({id});
            console.log({images});
        const result = await productServices.add_product_images(id, images);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.remove_images_from_a_product = async (req, res) => {
    try {
        const id = req.params.id,
            images = req.body.images;
        const result = await productServices.remove_product_images(id, images);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*****************End::PRODUCT RELATED****************/
/****************************************************/


/******************************************************/
/******************Begin::CART RELATED****************/
/****************************************************/

adminController.get_all_requested_carts = async (req, res) => {
    try {
        const data = req.query;
        const result = await cartServices.get_all_selected_carts(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*******************End::CART RELATED*****************/
/****************************************************/


/******************************************************/
/******************Begin::ORDER RELATED***************/
/****************************************************/

adminController.get_all_requested_orders = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        const result = await orderServices.get_all_selected_orders(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.get_an_order = async (req, res) => {
    try {
        const result = await orderServices.get_an_order(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.update_an_order = async (req, res) => {
    try {
        const data = req.body,
            id = req.params.id;
        const result = await orderServices.update_an_order(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*******************End::ORDER RELATED****************/
/****************************************************/


/******************************************************/
/****************Begin::PAYMENT RELATED***************/
/****************************************************/

adminController.view_a_payment = async (req, res) => {
    try {
        const result = await paymentServices.get_a_payment(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.view_selected_payments = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        const result = await paymentServices.get_all_selected_payments(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*****************End::PAYMENT RELATED****************/
/****************************************************/


/******************************************************/
/*****************Begin::STOCK RELATED****************/
/****************************************************/

adminController.create_a_stock = async (req, res) => {
    try {
        let data = { ...req.body, user: req.user };
        const result = await stockServices.create_a_stock(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.update_a_stock = async (req, res) => {
    try {
        let data = { ...req.body, user: req.user },
            id = req.params.id;
        const result = await stockServices.update_a_stock(id, data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.delete_a_stock = async (req, res) => {
    try {
        const result = await stockServices.delete_a_stock(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.view_a_stock = async (req, res) => {
    try {
        const result = await stockServices.get_a_stock(req.params.id);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

adminController.view_selected_stocks = async (req, res) => {
    try {
        const data = req.query ? req.query : {};
        const result = await stockServices.get_all_selected_stocks(data);
        if (!result) throw new Error();

        const statusCode = result.status ? 200 : 400;
        return res.status(statusCode).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Something Went Wrong"
        })

    }
};

/******************************************************/
/*****************End::STOCK RELATED******************/
/****************************************************/


module.exports = adminController;