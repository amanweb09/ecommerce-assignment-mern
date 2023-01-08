const products = [
    {
        _id: "01",
        title: "XBox Controller",
        price: 1399,
        desc: "This is a wireless controller for XBox 360",
        images: {
            thumbnail: {
                location: "local",
                src: "xbox.png"
            },
            slider: []
        },
        availability: {
            inStock: true,
            sku: ""
        },
        category: "tech"
    },
    {
        _id: "02",
        title: "Airpods Pro",
        price: 21000,
        desc: "This Apple airpods",
        images: {
            thumbnail: {
                location: "local",
                src: "airpods.png"
            },
            slider: []
        },
        availability: {
            inStock: true,
            sku: ""
        },
        category: "tech"
    },
    {
        _id: "03",
        title: "Polo T-Shirt",
        price: 799,
        desc: "This is a collar t-shirt for men",
        images: {
            thumbnail: {
                location: "local",
                src: "tshirt.png"
            },
            slider: []
        },
        availability: {
            inStock: true,
            sku: ""
        },
        category: "clothing"
    },
    {
        _id: "04",
        title: "Optimum Nutrition Whey Protein",
        price: 2200,
        desc: "This is the chocolate flavor whey protein from ON",
        images: {
            thumbnail: {
                location: "local",
                src: "whey-protein.png"
            },
            slider: []
        },
        availability: {
            inStock: true,
            sku: ""
        },
        category: "nutrition"
    },
    {
        _id: "05",
        title: "Nike Air Jordans",
        price: 16500,
        desc: "These are Air Jordans from Nike",
        images: {
            thumbnail: {
                location: "local",
                src: "shoes.png"
            },
            slider: []
        },
        availability: {
            inStock: false,
            sku: ""
        },
        category: "footwear"
    },
]

export default products;