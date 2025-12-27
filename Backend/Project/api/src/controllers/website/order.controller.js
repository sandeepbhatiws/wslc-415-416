const orderModal = require("../../models/order")
const Razorpay = require('razorpay');

var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

var instance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});

exports.placeOrder = async (request, response) => {

    try {
        var token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Token is InCorrect !!',
            _data: null
        }

        response.send(data)
    }

    var totalOrders = await orderModal.find().countDocuments();
    var totalOrders = totalOrders + 1001;


    dataSave = request.body;
    dataSave.user_id = decoded.uerInfo._id;
    dataSave.order_number = 'MONSTA_' + totalOrders;

    orderModal(dataSave).save()
        .then(async (result) => {

            var orderInfo = await instance.orders.create({
                "amount": request.body.net_amount * 100,
                "currency": "INR",
                "receipt": result._id,
                "partial_payment": false,
            })

            await orderModal.updateOne({ _id: result._id }, { $set: { order_id: orderInfo.id } })

            const data = {
                _status: true,
                _message: 'Order placed successfully !',
                _order_info: orderInfo,
                _data: result
            }

            response.send(data)
        })
        .catch((error) => {
            var errorMessages = {};
            for (var i in error.errors) {
                errorMessages[i] = error.errors[i].message;
            }

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: errorMessages,
                _data: null
            }

            response.send(data)
        })
};


exports.changeStatus = async (request, response) => {

    try {
        var token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Token is InCorrect !!',
            _data: null
        }

        response.send(data)
    }

    var dataSave = {};

    var checkPayment = await instance.payments.fetch(request.body.razorpay_payment_id);

    dataSave.payment_id = request.body.razorpay_payment_id;

    if (checkPayment.status == 'authorized') {
        if (checkPayment.order_id != request.body.razorpay_order_id) {
            dataSave.order_status = 7;
            dataSave.payment_status = 3;
            var payment_status = 0;
        } else {
            dataSave.order_status = 2;
            dataSave.payment_status = 2;
            var payment_status = 1;
        }
    } else {
        dataSave.order_status = 7;
        dataSave.payment_status = 3;
        var payment_status = 0;
    }

    await orderModal.updateOne({
        order_id: request.body.razorpay_order_id
    }, {
        $set: dataSave
    })
    .then((result) => {
        const data = {
            _status: true,
            _message: 'Order status change successfully !!',
            _payment_status : payment_status,
            _data: result
        }

        response.send(data)
    })
    .catch((error) => {
        var errorMessages = {};
        for (var i in error.errors) {
            errorMessages[i] = error.errors[i].message;
        }

        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error: errorMessages,
            _data: null
        }

        response.send(data)
    })
}

exports.dashboard = async (request, response) => {

    try {
        var token = request.headers.authorization.split(' ');
        var decoded = jwt.verify(token[1], process.env.secret_key);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Token is InCorrect !!',
            _data: null
        }

        response.send(data)
    }

    // var totalOrders = await orderModal.aggregate([
    //     { $count : 'totalRecords' }
    // ]);

    var totalOrders = await orderModal.aggregate(
        [
            {
                $group:{
                    _id: "",
                    minPrice: { $min: "$net_amount" },
                    maxPrice: { $max: "$net_amount" },
                    avgPrice: { $avg: "$net_amount" },
                    sumPrice: { $sum: "$net_amount" }
                }
            }
        ]
    )
    
    const data = {
        _status: true,
        _message: 'Record fetch successfully !!',
        total_orders : totalOrders
    }

    response.send(data)
}