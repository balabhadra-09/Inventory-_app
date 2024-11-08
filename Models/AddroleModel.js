const mongoose = require("mongoose");
const AddroleSchema = new mongoose.Schema({
    role: { type: String, reqire: true },
    description: { type: String, require: true },
    permissions: {
        item: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        },

        category: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        },

        purchase: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        },

        payment: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        },

        vendor: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        },

        user: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        },
        sales:{
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}

        },

        roleAndPermission: {
            view:{type:Boolean},
            create:{type:Boolean},
            edit:{type:Boolean},
            delete:{type:Boolean}
        }
    }

},
{timestamps:true});

module.exports = mongoose.model('Addrole', AddroleSchema)