
// export interface FoodMenuItem {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   mainImage: string;
//   crusialImages: string[]; // Changed to string[] as it's an array of image URLs
// }

// export const foodMenuItems: FoodMenuItem[] = [
//   {
//     id: "fm-001",
//     title: "Classic Cheeseburger",
//     description: "A juicy beef patty with cheddar cheese, lettuce, tomato, onion, and pickles on a brioche bun.",
//     price: 12.50,
//     mainImage: "https://example.com/images/cheeseburger_main.jpg",
//     crusialImages: [
//       "https://example.com/images/cheeseburger_side1.jpg",
//       "https://example.com/images/cheeseburger_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-002",
//     title: "Spicy Chicken Sandwich",
//     description: "Crispy fried chicken breast tossed in a Nashville-style hot sauce, with coleslaw and pickles.",
//     price: 11.75,
//     mainImage: "https://example.com/images/spicychicken_main.jpg",
//     crusialImages: [
//       "https://example.com/images/spicychicken_side1.jpg",
//       "https://example.com/images/spicychicken_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-003",
//     title: "Vegan Black Bean Burger",
//     description: "A hearty black bean patty with avocado, sprouts, and a vegan aioli on a whole wheat bun.",
//     price: 13.00,
//     mainImage: "https://example.com/images/veganburger_main.jpg",
//     crusialImages: [
//       "https://example.com/images/veganburger_side1.jpg",
//       "https://example.com/images/veganburger_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-004",
//     title: "Margherita Pizza",
//     description: "San Marzano tomato sauce, fresh mozzarella, and basil on a hand-stretched crust.",
//     price: 16.00,
//     mainImage: "https://example.com/images/margheritapizza_main.jpg",
//     crusialImages: [
//       "https://example.com/images/margheritapizza_side1.jpg",
//       "https://example.com/images/margheritapizza_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-005",
//     title: "Pepperoni Pizza",
//     description: "Classic pepperoni and mozzarella cheese on a crispy crust.",
//     price: 17.50,
//     mainImage: "https://example.com/images/pepperonipizza_main.jpg",
//     crusialImages: [
//       "https://example.com/images/pepperonipizza_side1.jpg",
//       "https://example.com/images/pepperonipizza_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-006",
//     title: "Grilled Salmon with Asparagus",
//     description: "Pan-seared salmon fillet with roasted asparagus and lemon-dill sauce.",
//     price: 22.00,
//     mainImage: "https://example.com/images/salmon_main.jpg",
//     crusialImages: [
//       "https://example.com/images/salmon_side1.jpg",
//       "https://example.com/images/salmon_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-007",
//     title: "Chicken Caesar Salad",
//     description: "Romaine lettuce, grilled chicken, parmesan cheese, croutons, and Caesar dressing.",
//     price: 14.00,
//     mainImage: "https://example.com/images/caesarsalad_main.jpg",
//     crusialImages: [
//       "https://example.com/images/caesarsalad_side1.jpg",
//       "https://example.com/images/caesarsalad_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-008",
//     title: "Steak Frites",
//     description: "8oz sirloin steak cooked to perfection, served with golden crispy french fries.",
//     price: 28.00,
//     mainImage: "https://example.com/images/steakfrites_main.jpg",
//     crusialImages: [
//       "https://example.com/images/steakfrites_side1.jpg",
//       "https://example.com/images/steakfrites_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-009",
//     title: "Pasta Primavera",
//     description: "Fresh seasonal vegetables tossed with penne pasta in a light garlic and olive oil sauce.",
//     price: 15.50,
//     mainImage: "https://example.com/images/pastaprimavera_main.jpg",
//     crusialImages: [
//       "https://example.com/images/pastaprimavera_side1.jpg",
//       "https://example.com/images/pastaprimavera_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-010",
//     title: "Fish and Chips",
//     description: "Crispy battered cod served with thick-cut fries and tartar sauce.",
//     price: 18.00,
//     mainImage: "https://example.com/images/fishandchips_main.jpg",
//     crusialImages: [
//       "https://example.com/images/fishandchips_side1.jpg",
//       "https://example.com/images/fishandchips_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-011",
//     title: "BBQ Pulled Pork Sandwich",
//     description: "Slow-cooked pulled pork in tangy BBQ sauce, served on a toasted bun with coleslaw.",
//     price: 13.50,
//     mainImage: "https://example.com/images/pulledpork_main.jpg",
//     crusialImages: [
//       "https://example.com/images/pulledpork_side1.jpg",
//       "https://example.com/images/pulledpork_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-012",
//     title: "Vegetable Lasagna",
//     description: "Layers of pasta, ricotta cheese, marinara sauce, and mixed vegetables, baked until bubbly.",
//     price: 16.50,
//     mainImage: "https://example.com/images/veglasanaga_main.jpg",
//     crusialImages: [
//       "https://example.com/images/veglasanaga_side1.jpg",
//       "https://example.com/images/veglasanaga_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-013",
//     title: "Shrimp Scampi",
//     description: "Succulent shrimp sautéed in garlic butter sauce with linguine pasta.",
//     price: 19.50,
//     mainImage: "https://example.com/images/shrimpscampi_main.jpg",
//     crusialImages: [
//       "https://example.com/images/shrimpscampi_side1.jpg",
//       "https://example.com/images/shrimpscampi_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-014",
//     title: "Mushroom Swiss Burger",
//     description: "Beef patty topped with sautéed mushrooms and melted Swiss cheese.",
//     price: 13.00,
//     mainImage: "https://example.com/images/mushroomswiss_main.jpg",
//     crusialImages: [
//       "https://example.com/images/mushroomswiss_side1.jpg",
//       "https://example.com/images/mushroomswiss_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-015",
//     title: "Caprese Salad",
//     description: "Fresh mozzarella, ripe tomatoes, basil, and a balsamic glaze.",
//     price: 10.00,
//     mainImage: "https://example.com/images/capresesalad_main.jpg",
//     crusialImages: [
//       "https://example.com/images/capresesalad_side1.jpg",
//       "https://example.com/images/capresesalad_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-016",
//     title: "Chicken Tikka Masala",
//     description: "Tender chicken pieces in a creamy, spiced tomato sauce, served with basmati rice.",
//     price: 17.00,
//     mainImage: "https://example.com/images/chickentikka_main.jpg",
//     crusialImages: [
//       "https://example.com/images/chickentikka_side1.jpg",
//       "https://example.com/images/chickentikka_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-017",
//     title: "Beef Tacos (3)",
//     description: "Three soft corn tortillas filled with seasoned ground beef, lettuce, cheese, and salsa.",
//     price: 12.00,
//     mainImage: "https://example.com/images/beeftacos_main.jpg",
//     crusialImages: [
//       "https://example.com/images/beeftacos_side1.jpg",
//       "https://example.com/images/beeftacos_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-018",
//     title: "Eggplant Parmesan",
//     description: "Breaded eggplant slices baked with marinara sauce and mozzarella cheese.",
//     price: 15.00,
//     mainImage: "https://example.com/images/eggplantparm_main.jpg",
//     crusialImages: [
//       "https://example.com/images/eggplantparm_side1.jpg",
//       "https://example.com/images/eggplantparm_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-019",
//     title: "Philly Cheesesteak",
//     description: "Thinly sliced steak with sautéed onions and melted provolone cheese on a hoagie roll.",
//     price: 14.50,
//     mainImage: "https://example.com/images/phillycheesesteak_main.jpg",
//     crusialImages: [
//       "https://example.com/images/phillycheesesteak_side1.jpg",
//       "https://example.com/images/phillycheesesteak_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-020",
//     title: "Falafel Wrap",
//     description: "Crispy falafel, hummus, lettuce, tomato, and tahini sauce in a warm pita.",
//     price: 11.00,
//     mainImage: "https://example.com/images/falafelwrap_main.jpg",
//     crusialImages: [
//       "https://example.com/images/falafelwrap_side1.jpg",
//       "https://example.com/images/falafelwrap_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-021",
//     title: "Sushi Platter (Chef's Selection)",
//     description: "An assortment of fresh nigiri and maki rolls, chosen by our sushi chef.",
//     price: 25.00,
//     mainImage: "https://example.com/images/sushiplatter_main.jpg",
//     crusialImages: [
//       "https://example.com/images/sushiplatter_side1.jpg",
//       "https://example.com/images/sushiplatter_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-022",
//     title: "Korean BBQ Beef Bowl",
//     description: "Marinated grilled beef, steamed rice, kimchi, and a fried egg.",
//     price: 18.50,
//     mainImage: "https://example.com/images/koreanbbq_main.jpg",
//     crusialImages: [
//       "https://example.com/images/koreanbbq_side1.jpg",
//       "https://example.com/images/koreanbbq_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-023",
//     title: "French Onion Soup",
//     description: "Rich beef broth with caramelized onions, topped with a crouton and melted Gruyere cheese.",
//     price: 9.00,
//     mainImage: "https://example.com/images/frenchonionsoup_main.jpg",
//     crusialImages: [
//       "https://example.com/images/frenchonionsoup_side1.jpg",
//       "https://example.com/images/frenchonionsoup_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-024",
//     title: "Chocolate Lava Cake",
//     description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
//     price: 8.00,
//     mainImage: "https://example.com/images/lavacake_main.jpg",
//     crusialImages: [
//       "https://example.com/images/lavacake_side1.jpg",
//       "https://example.com/images/lavacake_side2.jpg",
//     ],
//   },
//   {
//     id: "fm-025",
//     title: "New York Cheesecake",
//     description: "Creamy classic New York-style cheesecake with a graham cracker crust.",
//     price: 7.50,
//     mainImage: "https://example.com/images/cheesecake_main.jpg",
//     crusialImages: [
//       "https://example.com/images/cheesecake_side1.jpg",
//       "https://example.com/images/cheesecake_side2.jpg",
//     ],
//   },
// ];
