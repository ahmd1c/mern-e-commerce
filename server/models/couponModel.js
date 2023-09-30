// create coupon schema in mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
        discount: {
        type: Number,
        required: true,
        
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
        set: (val) => {
            return new Date(val).toISOString();
        },
        get: v => new Date(v).toISOString()
    },
    endDate: {
        type: Date,
        required: true,
        default: function(){
            return new Date(this.startDate).setDate(this.startDate.getDate() + 2);
        } ,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: '{VALUE} is not a valid date'
        },
        
        set: (val) => {
            return new Date(val).toISOString();
        },
        get: v => new Date(v).toISOString()
    },
},{timestamps : true});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;