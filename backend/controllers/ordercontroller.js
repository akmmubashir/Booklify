const { Order } = require("../models/schema");

//Create Data Start

const PlaceOrder = async(req, res) => {
    const {
        name,
        email,
        address,
        pincode,
        country,
        phone,
        alterphone,
        product,
        buymode,
        delivery,
    } = req.body;

    const data = await Order.findOne({ name, name });

    if (data) {
        res.json({
            message: "Order already in placed",
            isError: true,
        });
    } else {
        const newOrder = await Order.create({
            name,
            email,
            address,
            pincode,
            country,
            phone,
            alterphone,
            product,
            buymode,
            delivery,
        });
        res.json({
            Message: "Order Placed",
            Details: newOrder,
        });
    }
};
//Create Data End

//Update Data Start

// const updateBook = async(req, res) => {
//     const _id = req.params.id;
//     const { bookname, author, publication, price, category, description } =
//     req.body;

//     await Order.findByIdAndUpdate(_id, {
//         bookname,
//         author,
//         publication,
//         category,
//         description,
//         price,
//     });
//     res.json("Book Updated");
// };

//Update Data End

//Delete Data Start
const CancelOrder = async(req, res) => {
    const _id = req.params.id;
    const deleteorder = await Order.findByIdAndDelete(_id);
    res.json("Order Cancelled");
};
//Delete Data End

//Display Function Start

const DisplayOrder = async(req, res) => {
    const displayorder = await Order.find();
    res.json(displayorder);
};
// Display Function End

// Display with params Start

const DisplayOrderParams = async(req, res) => {
    const _id = req.params.id;
    // console.log(_id, "params");
    const displayOrderParam = await Order.findById(_id);
    // console.log(displayOrderParam);
    res.json(displayOrderParam);
};
// Display with params End

module.exports = {
    PlaceOrder,
    CancelOrder,
    DisplayOrder,
    DisplayOrderParams,
};