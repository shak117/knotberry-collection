// Knot Berry Crochet - Product Catalog Data (Prices in Indian Rupees ₹)
const KNOT_BERRY_PRODUCTS = [
  // --- HAIR CLIPS ---
  {
    id: 1,
    name: "Strawberry Blossom Snap Clips (Pair)",
    category: "hair-clips",
    categoryLabel: "Hair Clips",
    price: 199,
    originalPrice: 299,
    rating: 5.0,
    reviewsCount: 78,
    tag: "Bestseller",
    badgeColor: "berry",
    image: "assets/images/prod-strawberry-clips.jpg",
    hoverImage: "assets/images/hair-clips-collection.jpg",
    description: "Adorable handmade crochet ripe strawberries perched on gold-plated snap clips. Crafted with 100% ultra-soft combed milk cotton yarn and stitched with tiny cream seeds.",
    features: [
      "Set of 2 handcrafted clips",
      "Premium gold-plated alligator snap clips",
      "Will not snag or pull hair",
      "100% organic milk cotton yarn"
    ],
    dimensions: "5.0 cm x 3.2 cm",
    colors: ["Sweet Berry Red", "Pastel Strawberry Pink", "Wild Berry Peach"],
    care: "Spot clean gently with cold water and mild soap. Lay flat on towel to dry.",
    inStock: true,
    stockLeft: 6
  },
  {
    id: 2,
    name: "Aqua Flutter Bow",
    category: "hair-clips",
    categoryLabel: "Hair Clips",
    price: 249,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 54,
    tag: "Staff Pick",
    badgeColor: "pink",
    image: "assets/images/prod-bow-clips.jpg",
    hoverImage: "assets/images/hair-clips-collection.jpg",
    description: "Whimsical handmade crochet bow hair clips crafted in delicate textured knit stitches with secure metal alligator grip. Perfect for coquette hairstyles, half-up dos, and adding sweet aesthetic charm to any outfit.",
    features: [
      "Handcrafted crochet ribbon bow clip",
      "Sturdy anti-slip metal barrette clip on back",
      "Lightweight & won't snag or pull hair",
      "100% premium soft combed cotton yarn"
    ],
    dimensions: "6.5 cm x 4.0 cm",
    colors: ["Pastel Sky Blue", "Ballerina Pink", "Vanilla Cream", "Lavender Mist"],
    care: "Spot clean gently with cold water. Lay flat to air dry.",
    inStock: true,
    stockLeft: 4
  },
  {
    id: 3,
    name: "Pastel Daisy Garden Hairpins (Trio)",
    category: "hair-clips",
    categoryLabel: "Hair Clips",
    price: 179,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 42,
    tag: "New Drop",
    badgeColor: "green",
    image: "assets/images/hair-clips-collection.jpg",
    hoverImage: "assets/images/prod-floral-tie.jpg",
    description: "A sunny trio of blooming crochet daisies with gentle white petals, sunny yellow centers, and tiny green sage leaves. Brightens up any hairstyle instantly!",
    features: [
      "Set of 3 daisy pins",
      "Sturdy anti-slip metal grip",
      "Colorfast pastel dye",
      "Handmade floral crochet stitch"
    ],
    dimensions: "4.2 cm diameter each",
    colors: ["Daisy White & Yellow", "Pastel Peach Blossom", "Buttercup Cream"],
    care: "Gentle spot clean only.",
    inStock: true,
    stockLeft: 9
  },
  {
    id: 4,
    name: "Sweet Bear Ear Velvet Clips (Pair)",
    category: "hair-clips",
    categoryLabel: "Hair Clips",
    price: 229,
    originalPrice: 299,
    rating: 5.0,
    reviewsCount: 39,
    tag: "Trending",
    badgeColor: "brown",
    image: "assets/images/prod-bear-keychain.jpg",
    hoverImage: "assets/images/hair-clips-collection.jpg",
    description: "Ultra-cozy rounded crochet bear ears lined with soft pink inner pads. Perfect for kawaii space buns, braids, or side clips.",
    features: [
      "Double ear clips set",
      "Plump 3D amigurumi shape",
      "Super light & durable",
      "Velvet touch cotton thread"
    ],
    dimensions: "4.5 cm x 4.0 cm",
    colors: ["Warm Biscuit Beige", "Milk Chocolate", "Creamy Vanilla"],
    care: "Fluff gently after unpacking; spot clean if needed.",
    inStock: true,
    stockLeft: 5
  },

  // --- KEYCHAINS ---
  {
    id: 5,
    name: "Blushing Baby Bunny Amigurumi Keychain",
    category: "keychains",
    categoryLabel: "Keychains",
    price: 299,
    originalPrice: 399,
    rating: 5.0,
    reviewsCount: 112,
    tag: "Bestseller",
    badgeColor: "berry",
    image: "assets/images/prod-bunny-keychain.jpg",
    hoverImage: "assets/images/keychains-collection.jpg",
    description: "An irresistibly cute 3D amigurumi baby bunny with blushing pink cheeks, floral ribbon collar, tiny jingle bell, and shiny gold heart charm. Hand-stitched with love!",
    features: [
      "3D stuffed amigurumi plush",
      "Heavy duty gold lobster clasp & split ring",
      "Removable mini jingle bell",
      "Hypoallergenic polyfill stuffing"
    ],
    dimensions: "9.0 cm height (excluding clasp)",
    colors: ["Powder Pink", "Snow White", "Baby Apricot"],
    care: "Surface wash with damp cloth. Air dry away from direct heat.",
    inStock: true,
    stockLeft: 3
  },
  {
    id: 6,
    name: "Honey Bear Head Charm Keychain",
    category: "keychains",
    categoryLabel: "Keychains",
    price: 279,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 65,
    tag: "Popular",
    badgeColor: "brown",
    image: "assets/images/prod-bear-keychain.jpg",
    hoverImage: "assets/images/keychains-collection.jpg",
    description: "Chubby amigurumi bear face with sweet hand-embroidered nose, rosey pink blush, and an antique gold star charm. Adds instant cuteness to backpacks and car keys.",
    features: [
      "Includes gold star charm pendant",
      "Sturdy 360-degree swivel clip",
      "Firm, durable amigurumi stitching",
      "Reinforced hanging loop"
    ],
    dimensions: "6.0 cm x 5.5 cm",
    colors: ["Toasted Caramel", "Honey Cream", "Pecan Brown"],
    care: "Spot clean only. Do not machine wash.",
    inStock: true,
    stockLeft: 8
  },
  {
    id: 7,
    name: "Sweet Amigurumi Strawberry Bag Charm",
    category: "keychains",
    categoryLabel: "Keychains",
    price: 219,
    originalPrice: 299,
    rating: 5.0,
    reviewsCount: 89,
    tag: "Signature",
    badgeColor: "berry",
    image: "assets/images/keychains-collection.jpg",
    hoverImage: "assets/images/prod-strawberry-clips.jpg",
    description: "The signature Knot Berry strawberry! Plump 3D crochet strawberry with textured pip seeds, leafy green calyx, and gold hardware. Perfect accessory for tote bags.",
    features: [
      "Signature Knot Berry silhouette",
      "Rich vibrant berry shades",
      "Plump bouncy filling",
      "Reinforced seam structure"
    ],
    dimensions: "5.5 cm x 4.0 cm",
    colors: ["Classic Strawberry Red", "Pastel Berry Milk", "Deep Raspberry"],
    care: "Wipe with damp cloth and reshape.",
    inStock: true,
    stockLeft: 12
  },
  {
    id: 8,
    name: "Peachy Embroidered Heart Charm",
    category: "keychains",
    categoryLabel: "Keychains",
    price: 259,
    originalPrice: 329,
    rating: 4.9,
    reviewsCount: 47,
    tag: "Limited Stock",
    badgeColor: "pink",
    image: "assets/images/keychains-collection.jpg",
    hoverImage: "assets/images/prod-bow-clips.jpg",
    description: "Soft crochet puffy heart detailed with hand-embroidered floral sprigs and tiny micro ribbon bow. A thoughtful, romantic gift for your bestie or yourself!",
    features: [
      "Hand-embroidered wildflower detail",
      "Double-sided puffy cushion",
      "Polished brass key loop",
      "Soft pastel peach yarn"
    ],
    dimensions: "6.0 cm x 5.5 cm",
    colors: ["Peachy Rose", "Blush Pink", "Lilac Bloom"],
    care: "Spot clean carefully around embroidery threads.",
    inStock: true,
    stockLeft: 4
  },

  // --- HAIR TIES & SCRUNCHIES ---
  {
    id: 9,
    name: "Strawberry Fields Ruffle Scrunchie",
    category: "hair-ties",
    categoryLabel: "Hair Ties",
    price: 249,
    originalPrice: 329,
    rating: 5.0,
    reviewsCount: 93,
    tag: "Bestseller",
    badgeColor: "berry",
    image: "assets/images/prod-ruffle-scrunchie.jpg",
    hoverImage: "assets/images/hair-ties-collection.jpg",
    description: "Luxuriously full crochet ruffle scrunchie featuring cute miniature embroidered strawberries and a delicate scalloped cream lace border. Gentle on hair, zero dents!",
    features: [
      "Extra wide ruffle circumference",
      "High-elastic core (holds thick hair)",
      "Zero pull / anti-breakage guarantee",
      "Hand-crocheted lace edge"
    ],
    dimensions: "12 cm outer diameter",
    colors: ["Berry Blush with Cream Lace", "Vanilla Cream with Berry Lace", "Dusty Rose"],
    care: "Hand wash gently in lukewarm water. Lay flat on dry towel.",
    inStock: true,
    stockLeft: 7
  },
  {
    id: 10,
    name: "Pastel Daisy Bloom Hair Ties (Pair)",
    category: "hair-ties",
    categoryLabel: "Hair Ties",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 61,
    tag: "Staff Pick",
    badgeColor: "green",
    image: "assets/images/prod-floral-tie.jpg",
    hoverImage: "assets/images/hair-ties-collection.jpg",
    description: "Two durable, seamless pastel pink elastic bands topped with hand-crocheted 12-petal daisies. Ideal for daily ponytails, twin pigtails, and bun accents.",
    features: [
      "Pair of 2 daisy elastics",
      "Strong stretch seamless cord",
      "Securely anchored crochet base",
      "Does not crease hair"
    ],
    dimensions: "5.0 cm flower diameter",
    colors: ["Classic Daisy White", "Blush Pink Daisy", "Sunshine Yellow"],
    care: "Rinse gently in cold water if soiled.",
    inStock: true,
    stockLeft: 10
  },
  {
    id: 11,
    name: "Cloud Puff Velvety Crochet Scrunchie",
    category: "hair-ties",
    categoryLabel: "Hair Ties",
    price: 269,
    originalPrice: 349,
    rating: 4.9,
    reviewsCount: 38,
    tag: "New Drop",
    badgeColor: "pink",
    image: "assets/images/hero-banner.jpg",
    hoverImage: "assets/images/hair-ties-collection.jpg",
    description: "Plush, cloud-like scrunchie worked in luxurious chenille velvet crochet stitches. Silky soft to the touch and holds even the thickest bun effortlessly.",
    features: [
      "Velvet chenille yarn texture",
      "Ultra-gentle on curls and straight hair",
      "Fluffy cloud volume",
      "Double elastic reinforcement"
    ],
    dimensions: "13 cm outer diameter",
    colors: ["Cloud Rose Pink", "Whipped Cream", "Mauve Berry"],
    care: "Hand wash only. Air dry flat to retain velvet fluffiness.",
    inStock: true,
    stockLeft: 5
  },
  {
    id: 12,
    name: "Mini Strawberry Duo Elastic Ties",
    category: "hair-ties",
    categoryLabel: "Hair Ties",
    price: 169,
    originalPrice: 229,
    rating: 4.9,
    reviewsCount: 82,
    tag: "Cute Deal",
    badgeColor: "berry",
    image: "assets/images/hair-ties-collection.jpg",
    hoverImage: "assets/images/prod-strawberry-clips.jpg",
    description: "A pair of darling petite crochet strawberries with miniature white blossom charms attached to soft pastel hair elastics. Loved by girls of all ages!",
    features: [
      "Set of 2 strawberry hair ties",
      "Includes mini flower companion charm",
      "Snag-free soft elastic band",
      "Vibrant fade-resistant cotton"
    ],
    dimensions: "3.5 cm strawberry charm",
    colors: ["Strawberry Red & Pink", "Pastel Peaches", "Berry & Cream"],
    care: "Hand wash gently with cool water.",
    inStock: true,
    stockLeft: 14
  }
];

// Verified Initial Orders for Verification & Admin Control
const INITIAL_KNOT_BERRY_ORDERS = [
  {
    id: "KB-781924",
    customerName: "Chloe Sharma",
    phone: "+91 77580 14770",
    email: "chloe.sharma@example.com",
    address: "Flat 402, Blossom Heights, Bandra West, Mumbai",
    items: [
      { name: "Strawberry Blossom Snap Clips (Pair)", color: "Sweet Berry Red", quantity: 2, price: 199 }
    ],
    subtotal: 398,
    shipping: 49,
    total: 447,
    status: "Delivered",
    date: "06 Sep 2026",
    paymentMethod: "UPI (bhumiawale08@okaxis)"
  },
  {
    id: "KB-620418",
    customerName: "Ananya Roy",
    phone: "+91 98111 22334",
    email: "ananya.roy@example.com",
    address: "B-12, Green Park Avenue, Indiranagar, Bengaluru",
    items: [
      { name: "Blushing Baby Bunny Amigurumi Keychain", color: "Powder Pink", quantity: 1, price: 299 },
      { name: "Strawberry Fields Ruffle Scrunchie", color: "Berry Blush with Cream Lace", quantity: 1, price: 249 }
    ],
    subtotal: 548,
    shipping: 0, // Free shipping >= ₹499
    total: 548,
    status: "Making with Love",
    date: "07 Sep 2026",
    paymentMethod: "Credit / Debit Card"
  },
  {
    id: "KB-519302",
    customerName: "Riya Patel",
    phone: "+91 99220 33445",
    email: "riya.patel@example.com",
    address: "Row House 7, Strawberry Lane, Viman Nagar, Pune",
    items: [
      { name: "Aqua Flutter Bow", color: "Pastel Sky Blue", quantity: 1, price: 249 }
    ],
    subtotal: 249,
    shipping: 49,
    total: 298,
    status: "Dispatched",
    date: "05 Sep 2026",
    paymentMethod: "Cash on Delivery"
  }
];

// Customer reviews for social proof section with Order ID link
const INITIAL_KNOT_BERRY_REVIEWS = [
  {
    id: 1,
    name: "Chloe Sharma",
    avatar: "🌸",
    location: "Mumbai, India",
    orderId: "KB-781924",
    rating: 5,
    date: "Yesterday",
    product: "Strawberry Blossom Snap Clips (Pair)",
    comment: "These are the CUTEST hair clips I have ever owned! The crochet work is so tight and neat, and they stay securely in my fine hair without slipping. Will definitely be ordering more for my sister's birthday! 🍓✨",
    verified: true
  },
  {
    id: 2,
    name: "Emily Roy",
    avatar: "🎀",
    location: "Bengaluru, India",
    orderId: "KB-620418",
    rating: 5,
    date: "3 days ago",
    product: "Blushing Baby Bunny Amigurumi Keychain",
    comment: "The little bunny is so ridiculously soft and charming! The jingle bell is sweet, and the gold clasp feels very sturdy. The packaging came with cute pink ribbons and stickers! 🥰",
    verified: true
  },
  {
    id: 3,
    name: "Sofia Patel",
    avatar: "🍓",
    location: "Pune, India",
    orderId: "KB-519302",
    rating: 5,
    date: "1 week ago",
    product: "Strawberry Fields Ruffle Scrunchie",
    comment: "I get so many compliments whenever I wear this scrunchie! The ruffle details are exquisite and it doesn't give me ponytail headaches. 100/10 recommend Knot Berry! 💖",
    verified: true
  },
  {
    id: 4,
    name: "Aria Kapoor",
    avatar: "✨",
    location: "Delhi, India",
    orderId: "KB-781924",
    rating: 5,
    date: "2 weeks ago",
    product: "Aqua Flutter Bow",
    comment: "Pure pastel dream! The sky blue color is so vibrant and it matches all my outfits. knotberry.studios is my new favorite handmade shop! 🎀",
    verified: true
  }
];
