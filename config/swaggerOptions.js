const swaggerJsdoc = require('swagger-jsdoc');
const ORDER_STATUSES = require('./orderStatuses')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Arash's cosmetic website APIs",
            version: '1.0.0',
            description: 'My API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3500',
                description: 'Local server',
            },
            {
                url: 'https://cosmetic-backend.onrender.com',
                description: 'deployed version on render.com',
            },
            {
                url: 'https://cosmetic-backend.iran.liara.run',
                description: 'deployed version on liara.ir',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: [
                        'username',
                        'password',
                        'email',
                        'isEmailConfirmed',
                        'isPhoneNummberConfirmed',
                    ],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'The username of the user.',
                            example: 'johndoe',
                            minLength: 1,
                            maxLength: 255,
                        },
                        firstname: {
                            type: 'string',
                            description: 'The first name of the user.',
                            example: 'John',
                            minLength: 1,
                            maxLength: 255,
                        },
                        lastname: {
                            type: 'string',
                            description: 'The last name of the user.',
                            example: 'Doe',
                            minLength: 1,
                            maxLength: 255,
                        },
                        roles: {
                            type: 'object',
                            description: 'The roles of the user.',
                            properties: {
                                User: {
                                    type: 'number',
                                    description: 'The user role code.',
                                    example: 1111,
                                    minimum: 0,
                                    maximum: 9999,
                                },
                                Editor: {
                                    type: 'number',
                                    description: 'The editor role code.',
                                    example: 2222,
                                    minimum: 0,
                                    maximum: 9999,
                                },
                                Admin: {
                                    type: 'number',
                                    description: 'The admin role code.',
                                    example: 3333,
                                    minimum: 0,
                                    maximum: 9999,
                                },
                                Salesman: {
                                    type: 'number',
                                    description: 'The salesman role code.',
                                    example: 4444,
                                    minimum: 0,
                                    maximum: 9999,
                                },
                            },
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the user.',
                            example: 'mysecretpassword',
                            minLength: 8,
                            maxLength: 255,
                        },
                        email: {
                            type: 'string',
                            description: 'The email address of the user.',
                            example: 'johndoe@example.com',
                            format: 'email',
                        },
                        isEmailConfirmed: {
                            type: 'boolean',
                            description:
                                'Indicates whether the email address of the user has been confirmed.',
                            example: true,
                        },
                        phoneNumber: {
                            type: 'string',
                            description: 'The phone number of the user.',
                            example: '1234567890',
                            minLength: 10,
                            maxLength: 20,
                        },
                        isPhoneNummberConfirmed: {
                            type: 'boolean',
                            description:
                                'Indicates whether the phone number of the user has been confirmed.',
                            example: false,
                        },
                        address: {
                            type: 'object',
                            description: 'The address of the user.',
                            properties: {
                                city: {
                                    type: 'string',
                                    description:
                                        "The city of the user's address.",
                                    example: 'New York',
                                    minLength: 1,
                                    maxLength: 255,
                                },
                                state: {
                                    type: 'string',
                                    description:
                                        "The state of the user's address.",
                                    example: 'خراسان',
                                    minLength: 1,
                                    maxLength: 255,
                                },
                                postalCode: {
                                    type: 'number',
                                    example: 123456789,
                                },
                                details: {
                                    type: 'string',
                                    description: 'The street , area and ...',
                                    example:
                                        'Tehranpars , khiabane 112 sharghi',
                                },
                                phoneNumber: {
                                    type: 'string',
                                    example: '09121234567',
                                },
                            },
                        },
                        refreshToken: {
                            type: 'string',
                            example: 'alfiwifgbew11234121231',
                        },
                        favCategories: {
                            type: 'array',
                            items: {
                                type: 'string',
                                description: '_id of category',
                            },
                        },
                        favProducts: {
                            type: 'array',
                            items: {
                                type: 'string',
                                description: '_id of product',
                            },
                        },
                        verified: {
                            type: 'boolean',
                            description:
                                'Whether the user has been verified or not',
                            default: false,
                        },
                        active: {
                            type: 'boolean',
                            description:
                                'Whether the user account is active or not',
                            default: true,
                        },
                        suppliersAndPercentages: {
                            type: 'array',
                            description:
                                'An array of objects containing suppliers and their corresponding percentage',
                            items: {
                                type: 'object',
                                properties: {
                                    supplier: {
                                        type: 'string',
                                        description: 'The ID of the supplier',
                                    },
                                    percentage: {
                                        type: 'number',
                                        description:
                                            'The percentage for the supplier',
                                        minimum: 0,
                                        maximum: 100,
                                    },
                                },
                            },
                        },
                    },
                },
                Product: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the product.',
                            example: 'Product name',
                        },
                        slug: {
                            type: 'string',
                            description: 'The slug of the product.',
                            example: 'product-name',
                        },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'string',
                                description: '_id of category',
                                example: 'id of category',
                            },
                            description:
                                'An array of category IDs that this product belongs to.',
                        },
                        price: {
                            type: 'number',
                            description: 'The price of the product.',
                            example: 99.99,
                        },
                        brand: {
                            type: 'string',
                            description: 'The brand of the product.',
                            example: 'Brand name',
                        },
                        colors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    rgb: {
                                        type: 'string',
                                        description:
                                            'The RGB code of the color.',
                                        example: '255,255,255',
                                    },
                                    hex: {
                                        type: 'string',
                                        description:
                                            'The hex code of the color.',
                                        example: '#FFFFFF',
                                    },
                                },
                            },
                            description:
                                'An array of color objects that the product is available in.',
                        },
                        images: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: 'www.image-url.com',
                            },
                            description:
                                'An array of image URLs for the product.',
                        },
                        comments: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Comment',
                                example: '_idofcomment1213123212',
                            },
                            description:
                                'An array of comment IDs for the product.',
                        },
                        shippingClasses: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ShippingClass',
                                example: 'id of shippingclass',
                            },
                            description:
                                'An array of shipping class IDs that apply to the product.',
                        },
                        rating: {
                            type: 'number',
                            description: "The product's rating.",
                            example: 4.5,
                        },
                        tags: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Tag',
                            },
                            description:
                                'An array of tag IDs that apply to the product.',
                        },
                        details: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    key: {
                                        type: 'string',
                                        description: 'The key of the detail.',
                                        example: 'Material',
                                    },
                                    value: {
                                        type: 'string',
                                        description: 'The value of the detail.',
                                        example: 'Cotton',
                                    },
                                },
                            },
                            description:
                                'An array of objects containing details for the product.',
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the product.',
                            example: 'This is a description of the product.',
                        },
                        inventory: {
                            type: 'number',
                            description:
                                'The current inventory of the product.',
                            example: 100,
                        },
                        views: {
                            type: 'number',
                            description:
                                'The number of times the product has been viewed',
                        },
                        ordersCount: {
                            type: 'number',
                            default: 0,
                            description:
                                'Number of times that this product has been ordered',
                        },
                    },
                    required: ['name', 'categories', 'price'],
                },
                Brand: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Array of Category IDs',
                        },
                        verified: {
                            type: 'boolean',
                        },
                    },
                },
                Comment: {
                    type: 'object',
                    properties: {
                        comment: {
                            type: 'string',
                        },
                        isBought: {
                            type: 'boolean',
                        },
                        product: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        author: {
                            type: 'object',
                            properties: {
                                id: {
                                    type: 'string',
                                    format: 'ObjectId',
                                },
                                name: {
                                    type: 'string',
                                },
                            },
                        },
                        parentId: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        likes: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'ObjectId',
                            },
                        },
                        rate: {
                            type: 'number',
                        },
                        isConfirmed: {
                            type: 'boolean',
                            default: false,
                        },
                    },
                    required: ['comment'],
                    additionalProperties: false,
                },
                Detail: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            trim: true,
                            unique: true,
                        },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'ObjectId',
                            },
                        },
                        verified: {
                            type: 'boolean',
                            default: false,
                        },
                        values: {
                            type: 'array',
                            items: {
                                type: 'string',
                                required: true,
                                trim: true,
                                unique: true,
                            },
                        },
                    },
                    required: ['name', 'values'],
                    additionalProperties: false,
                },
                Notification: {
                    type: 'object',
                    properties: {
                        notifType: {
                            type: 'number',
                        },
                        visited: {
                            type: 'boolean',
                            default: false,
                        },
                        buyer: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        product: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        order: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        comment: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                    },
                    required: ['notifType'],
                    additionalProperties: false,
                },
                Option: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            trim: true,
                            unique: true,
                        },
                        categories: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'ObjectId',
                            },
                        },
                        verified: {
                            type: 'boolean',
                            default: false,
                        },
                        values: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        required: true,
                                        trim: true,
                                        unique: true,
                                    },
                                    verified: {
                                        type: 'boolean',
                                        default: false,
                                    },
                                },
                                required: ['name'],
                                additionalProperties: false,
                            },
                        },
                    },
                    required: ['name'],
                    additionalProperties: false,
                },
                Order: {
                    type: 'object',
                    properties: {
                        buyer: {
                            type: 'string',
                            format: 'ObjectId',
                            required: true,
                        },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    product: {
                                        type: 'string',
                                        format: 'ObjectId',
                                        required: true,
                                    },
                                    quantity: {
                                        type: 'number',
                                        required: true,
                                    },
                                    price: {
                                        type: 'number',
                                        required: true,
                                    },
                                },
                                required: ['product', 'quantity', 'price'],
                                additionalProperties: false,
                            },
                        },
                        shippingAddress: {
                            type: 'object',
                            properties: {
                                city: {
                                    type: 'string',
                                },
                                state: {
                                    type: 'string',
                                },
                                
                                postalCode: {
                                    type: 'string',
                                },
                                details: {
                                    type: 'string',
                                },
                                phoneNumber: {
                                    type: 'string',
                                },
                            },
                        },
                        paymentMethod: {
                            type: 'string',
                            enum: ['idpay'],
                        },
                        status: {
                            type: 'number',
                            default: 1,
                            required: true,
                        },
                        message: {
                            type: 'string',
                            default: 'در انتظار پرداخت',
                            required: true,
                            enum: ORDER_STATUSES,
                        },
                        orderNum: {
                            type: 'number',
                            unique: true,
                        },
                        deliveryNum: {
                            type: 'number',
                            unique: true,
                        },
                        transaction: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        taxPrice: {
                            type: 'number',
                        },
                        shippingPrice: {
                            type: 'number',
                        },
                        shippingClass: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        totalPrice: {
                            type: 'number',
                            required: true,
                            default: 0,
                        },
                        payablePrice: {
                            type: 'number',
                            required: true,
                            default: 0,
                        },
                        aff_id: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        aff_percent: {
                            type: 'number',
                        },
                        seen: {
                            type: 'boolean',
                            default: false,
                        },
                    },
                    required: [
                        'buyer',
                        'items',
                        'status',
                        'message',
                        'totalPrice',
                        'payablePrice',
                    ],
                    additionalProperties: false,
                },
                Post: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                            required: true,
                        },
                        content: {
                            type: 'string',
                            required: false,
                        },
                        authorId: {
                            type: 'string',
                            format: 'ObjectId',
                            required: true,
                        },
                        comments: {
                            type: 'string',
                            format: 'ObjectId',
                            required: true,
                        },
                        views: {
                            type: 'number',
                            default: 0,
                        },
                        tags: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                        keyWords: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                        },
                    },
                    required: ['title', 'authorId', 'comments'],
                    additionalProperties: false,
                },
                SalesmanRequest: {
                    type: 'object',
                    properties: {
                        user: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        confirmed: {
                            type: 'boolean',
                            default: false,
                        },
                        message: {
                            type: 'string',
                            default: 'منتظر بررسی توسط ادمین',
                        },
                        adminUpdateDate: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                    required: [],
                    additionalProperties: false,
                },
                ShippingClass: {
                    type: 'object',
                    properties: {
                        className: {
                            type: 'string',
                            trim: true,
                        },
                        classDescription: {
                            type: 'string',
                        },
                        cities: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                    },
                                    price: {
                                        type: 'number',
                                    },
                                },
                                required: ['name', 'price'],
                            },
                        },
                        isActive: {
                            type: 'boolean',
                        },
                    },
                    required: [],
                    additionalProperties: false,
                },
                Transaction: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        sender: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        receiver: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        amount: {
                            type: 'number',
                        },
                        status: {
                            type: 'number',
                            default: 1,
                            required: true,
                        },
                        message: {
                            type: 'string',
                            required: true,
                            default: 'پرداخت انجام نشده است',
                        },
                        order: {
                            type: 'string',
                            format: 'ObjectId',
                        },
                        card_no: {
                            type: 'string',
                        },
                        hashed_card_no: {
                            type: 'string',
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                        },
                        track_id: {
                            type: 'string',
                        },
                    },
                    required: [
                        'sender',
                        'receiver',
                        'amount',
                        'status',
                        'message',
                    ],
                    additionalProperties: false,
                },
                Wallet: {
                    type: 'object',
                    properties: {
                        owner: {
                            type: 'string',
                            format: 'ObjectId',
                            unique: true,
                        },
                        isActive: {
                            type: 'boolean',
                            default: true,
                        },
                        stock: {
                            type: 'number',
                            required: true,
                            default: 0,
                        },
                    },
                    required: ['owner', 'stock'],
                    additionalProperties: false,
                },
                WalletTransaction: {
                    type: 'object',
                    properties: {
                        wallet: {
                            type: 'string',
                            format: 'ObjectId',
                            ref: 'Wallet',
                        },
                        amount: {
                            type: 'number',
                        },
                        transaction: {
                            type: 'string',
                            format: 'ObjectId',
                            ref: 'Transaction',
                        },
                        order: {
                            type: 'string',
                            format: 'ObjectId',
                            ref: 'Order',
                        },
                        type: {
                            type: 'string',
                            enum: ['deposite', 'withdraw'],
                        },
                    },
                    required: ['wallet', 'amount', 'type'],
                    additionalProperties: false,
                },
            },
        },
    },
    apis: ['./routes/*/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
