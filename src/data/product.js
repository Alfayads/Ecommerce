const products = [
  {
    id: "D001",
    name: "Sunset Linen Dress",
    description: "A breathable linen dress perfect for warm sunsets and relaxed weekends.",
    price: 3237,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
     "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
     "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
     "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
     "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
    ],
    colors: [
      { name: "Coral", color: "#FF7F50" },
      { name: "White", color: "#FFFFFF" }
    ],
    availableColors: "2 colors available",
    category: "Casual"
  },
  {
    id: "D002",
    name: "Midnight Velvet Gown",
    description: "A sleek velvet gown designed for special evenings and luxury dinners.",
    price: 9960,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
    ],
    colors: [
      { name: "Navy", color: "#000080" },
      { name: "Black", color: "#000000" }
    ],
    availableColors: "2 colors available",
    category: "Formal"
  },
  {
    id: "D003",
    name: "Boho Floral Maxi",
    description: "A flowing floral maxi dress with bohemian patterns for free spirits.",
    price: 3776.5,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
    ],
    colors: [
      { name: "Rust", color: "#B7410E" },
      { name: "Sage", color: "#9DC183" },
      { name: "Cream", color: "#FFFDD0" }
    ],
    availableColors: "3 colors available",
    category: "Summer"
  },
  {
    id: "D004",
    name: "Vintage Polka Midi",
    description: "Retro polka dot dress with a cinched waist and flared skirt.",
    price: 4897,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
    ],
    colors: [
      { name: "Red", color: "#DC143C" },
      { name: "Black", color: "#000000" },
      { name: "Nude", color: "#FAD6BF" }
    ],
    availableColors: "3 colors available",
    category: "Vintage"
  },
  {
    id: "D005",
    name: "Street Shift Dress",
    description: "A loose-fitting streetwear shift dress for ultimate comfort and style.",
    price: 2896.7,
    sizes: ['M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
    ],
    colors: [
      { name: "Gray", color: "#808080" },
      { name: "Olive", color: "#808000" }
    ],
    availableColors: "2 colors available",
    category: "Streetwear"
  },
  {
    id: "D006",
    name: "Peach Wrap Dress",
    description: "Soft peach-toned wrap dress with a flattering V-neck cut.",
    price: 3486,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1551048632-5582b917c05d"
    ],
    colors: [
      { name: "Peach", color: "#FFE5B4" },
      { name: "Champagne", color: "#F7E7CE" }
    ],
    availableColors: "2 colors available",
    category: "Minimalist"
  },
  {
    id: "#D007",
    name: "Navy Office Dress",
    description: "A minimal, professional look for your weekday workwear.",
    price: 4233,
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d44"
    ],
    colors: [
      { name: "Navy", color: "#000080" },
      { name: "White", color: "#FFFFFF" }
    ],
    availableColors: "2 colors available",
    category: "Formal"
  },
  {
    id: "D008",
    name: "Floral Tier Dress",
    description: "A floral patterned tier dress with layered ruffles.",
    price: 5561,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
    ],
    colors: [
      { name: "Blush", color: "#FADADD" },
      { name: "Lilac", color: "#C8A2C8" },
      { name: "Ivory", color: "#FFFFF0" }
    ],
    availableColors: "3 colors available",
    category: "Summer"
  },
  {
    id: "D009",
    name: "Crimson Layered Gown",
    description: "Elegant crimson red layered gown with satin finishing.",
    price: 9130,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
    ],
    colors: [
      { name: "Crimson", color: "#DC143C" },
      { name: "Gold", color: "#FFD700" }
    ],
    availableColors: "2 colors available",
    category: "Party"
  },
  {
    id: "D010",
    name: "Sky Blue Frock",
    description: "A soft frock in sky blue with puffed sleeves.",
    price: 3228.7,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446"
    ],
    colors: [
      { name: "Blue", color: "#87CEEB" },
      { name: "Ivory", color: "#FFFFF0" }
    ],
    availableColors: "2 colors available",
    category: "Casual"
  },
  {
    id: "D011",
    name: "Ethnic Embroidered Kurti",
    description: "Traditional ethnic kurti with hand embroidery.",
    price: 5976,
    sizes: ['M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1579674943301-c95c2f0b6f93"
    ],
    colors: [
      { name: "Teal", color: "#008080" },
      { name: "Beige", color: "#F5F5DC" }
    ],
    availableColors: "2 colors available",
    category: "Ethnic"
  },
  {
    id: "D012",
    name: "Cozy Knit Dress",
    description: "Stay warm and chic with this knitted winter dress.",
    price: 5386.7,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1571137317274-ff6cfedf3eb8"
    ],
    colors: [
      { name: "Burgundy", color: "#800020" },
      { name: "Gray", color: "#A9A9A9" }
    ],
    availableColors: "2 colors available",
    category: "Winter"
  },
  {
    id: "D013",
    name: "Modern Slit Dress",
    description: "Stylish slit dress for modern evening vibes.",
    price: 7461.7,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1618365908648-b2248ac54f12"
    ],
    colors: [
      { name: "Black", color: "#000000" },
      { name: "Charcoal", color: "#36454F" }
    ],
    availableColors: "2 colors available",
    category: "Modern"
  },
  {
    id: "D014",
    name: "Pleated White Dress",
    description: "Clean and simple pleated dress for all-day elegance.",
    price: 4814,
    sizes: ['S', 'M', 'L'],
    images: [
      "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
    ],
    colors: [
      { name: "White", color: "#FFFFFF" }
    ],
    availableColors: "1 color available",
    category: "Minimalist"
  },
  {
    id: "D015",
    name: "Colorblock Street Dress",
    description: "Bold colorblock dress for statement streetwear styling.",
    price: 3901,
  sizes: ['M', 'L', 'XL'],
    images: [
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85"
    ],
    colors: [
      { name: "Black", color: "#000000" },
      { name: "Yellow", color: "#FFD700" }
    ],
    availableColors: "2 colors available",
    category: "Streetwear"
  },
  {
  id: "D016",
  name: "Silk Evening Dress",
  description: "A smooth silk evening gown that flows with elegance.",
  price: 9296,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1600180758890-6f5d9285d57f"
  ],
  colors: [
    { name: "Emerald", color: "#50C878" },
    { name: "Ivory", color: "#FFFFF0" }
  ],
  availableColors: "2 colors available",
  category: "Formal"
},
{
  id: "D017",
  name: "Red Carpet Dress",
  description: "Stunning floor-length dress designed for gala nights.",
  price: 12035,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1602810311491-65a127b99e01"
  ],
  colors: [
    { name: "Red", color: "#B22222" },
    { name: "Gold", color: "#FFD700" }
  ],
  availableColors: "2 colors available",
  category: "Party"
},
{
  id: "D018",
  name: "Pastel Summer Dress",
  description: "Breathable pastel dress with a floral pattern.",
  price: 2988,
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    "https://images.unsplash.com/photo-1520975910017-7f61c8f1d3d6"
  ],
  colors: [
    { name: "Mint", color: "#AAF0D1" },
    { name: "Peach", color: "#FFE5B4" }
  ],
  availableColors: "2 colors available",
  category: "Summer"
},
{
  id: "D019",
  name: "Cultural Festive Dress",
  description: "Ethnic printed dress ideal for traditional events.",
  price: 6474,
  sizes: ['M', 'L', 'XL'],
  images: [
    "https://images.unsplash.com/photo-1583267741447-e29b4b0f8fbb"
  ],
  colors: [
    { name: "Maroon", color: "#800000" },
    { name: "Yellow", color: "#FFD700" }
  ],
  availableColors: "2 colors available",
  category: "Ethnic"
},
{
  id: "D020",
  name: "Knitted Woolen Dress",
  description: "Cozy long-sleeve dress for cold winter days.",
  price: 5727,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1605130020845-9d378fd469e4"
  ],
  colors: [
    { name: "Gray", color: "#BEBEBE" },
    { name: "White", color: "#FFFFFF" }
  ],
  availableColors: "2 colors available",
  category: "Winter"
},
{
  id: "D021",
  name: "Monochrome Midi Dress",
  description: "Elegant midi dress with monochrome palette.",
  price: 4556.7,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1600181954474-e4a112b5f7b3"
  ],
  colors: [
    { name: "Black", color: "#000000" },
    { name: "White", color: "#FFFFFF" }
  ],
  availableColors: "2 colors available",
  category: "Minimalist"
},
{
  id: "D022",
  name: "Fuchsia Party Dress",
  description: "Vibrant and bold fuchsia dress to stand out.",
  price: 7221,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1600181954760-0cf4a4e94e4e"
  ],
  colors: [
    { name: "Fuchsia", color: "#FF00FF" },
    { name: "Blush", color: "#FADADD" }
  ],
  availableColors: "2 colors available",
  category: "Party"
},
{
  id: "D023",
  name: "Checkered Casual Dress",
  description: "Classic check print dress for everyday style.",
  price: 2739,
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978"
  ],
  colors: [
    { name: "Black", color: "#000000" },
    { name: "White", color: "#FFFFFF" }
  ],
  availableColors: "2 colors available",
  category: "Casual"
},
{
  id: "D024",
  name: "Beige A-Line Dress",
  description: "Simple A-line silhouette in neutral beige tone.",
  price: 3984,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1600180762083-99859d157378"
  ],
  colors: [
    { name: "Beige", color: "#F5F5DC" },
    { name: "Brown", color: "#A52A2A" }
  ],
  availableColors: "2 colors available",
  category: "Modern"
},
{
  id: "D025",
  name: "Frill Detail Dress",
  description: "Ruffled frill details for added charm and movement.",
  price: 5146,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1600180758890-1a7b5c6cc717"
  ],
  colors: [
    { name: "Champagne", color: "#F7E7CE" },
    { name: "White", color: "#FFFFFF" }
  ],
  availableColors: "2 colors available",
  category: "Vintage"
},
{
  id: "D026",
  name: "Silhouette Black Dress",
  description: "A defining silhouette dress for cocktail events.",
  price: 8715,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1622335560587-6ab67de8cbf9"
  ],
  colors: [
    { name: "Black", color: "#000000" }
  ],
  availableColors: "1 color available",
  category: "Formal"
},
{
  id: "D027",
  name: "Blue Blossom Dress",
  description: "Blue floral dress with cap sleeves for spring days.",
  price: 4648,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1542068829-1115f7259450"
  ],
  colors: [
    { name: "Sky Blue", color: "#87CEEB" },
    { name: "White", color: "#FFFFFF" }
  ],
  availableColors: "2 colors available",
  category: "Summer"
},
{
  id: "D028",
  name: "Khadi Traditional Dress",
  description: "Khadi fabric ethnic dress, eco-friendly and hand-spun.",
  price: 5644,
  sizes: ['M', 'L', 'XL'],
  images: [
    "https://images.unsplash.com/photo-1583337130417-3346a1f5a0ae"
  ],
  colors: [
    { name: "Cream", color: "#FFFDD0" },
    { name: "Maroon", color: "#800000" }
  ],
  availableColors: "2 colors available",
  category: "Ethnic"
},
{
  id: "D029",
  name: "Layered Party Gown",
  description: "Floor-length gown with layered sheer tulle fabric.",
  price: 10624,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1545231027-637d3f543eaf"
  ],
  colors: [
    { name: "Lavender", color: "#E6E6FA" },
    { name: "Ivory", color: "#FFFFF0" }
  ],
  availableColors: "2 colors available",
  category: "Party"
},
{
  id: "D030",
  name: "Wrap Winter Dress",
  description: "Long-sleeve wrap dress with wool blend for cold months.",
  price: 6225,
  sizes: ['S', 'M', 'L'],
  images: [
    "https://images.unsplash.com/photo-1587560699334-d3db6c9e3b9e"
  ],
  colors: [
    { name: "Olive", color: "#808000" },
    { name: "Brown", color: "#8B4513" }
  ],
  availableColors: "2 colors available",
  category: "Winter"
}

];


export default products;