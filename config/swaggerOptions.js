const swaggerJsdoc = require('swagger-jsdoc');

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
                                type:'string',
                                description:'_id of category'
                            },
                        },
                        favProducts: {
                            type: 'array',
                            items: {
                                type:'string',
                                description:'_id of product'
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
                Category: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the category',
                            example: 'Clothing',
                        },
                        slug: {
                            type: 'string',
                            description: 'The slug of the category',
                            example: 'clothing',
                        },
                        hsCode: {
                            type: 'string',
                            description: 'The HS code of the category',
                            example: '61.09',
                        },
                        parentId: {
                            type: 'string',
                            description: "The parent category's ID",
                            example: '60d9cf32f674b86fd0d10ec8',
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the category',
                            example: 'Clothing items for all genders and ages',
                        },
                        image: {
                            type: 'string',
                            description: 'The URL of the category image',
                            example: 'https://example.com/clothing.jpg',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description:
                                'The date and time when the category was created',
                            example: '2022-05-01T12:00:00.000Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description:
                                'The date and time when the category was last updated',
                            example: '2022-05-01T12:00:00.000Z',
                        },
                    },
                    required: ['name', 'slug'],
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
                                type:'string',
                                description:'_id of category',
                                example:'id of category'
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
                                example:'www.image-url.com'
                            },
                            description:
                                'An array of image URLs for the product.',
                        },
                        comments: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Comment',
                                example:'_idofcomment1213123212'
                            },
                            description:
                                'An array of comment IDs for the product.',
                        },
                        shippingClasses: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ShippingClass',
                                example:'id of shippingclass'
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
                        ordersCount :{
                            type:'number',
                            default:0,
                            description:"Number of times that this product has been ordered"
                        }
                    },
                    required:['name' , 'categories' , 'price' , ]
                },
            },
        },
    },
    apis: ['./routes/*/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
