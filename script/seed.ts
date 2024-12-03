const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    // Create a user
    const user = await db.user.create({
      data: {
        email: "exam1@example.com",
        password: "password", // Ensure this is hashed in production
        username: "examuser",
      },
    });

    // Add products with the created user's ID
    await db.product.createMany({
      data: [
        {
          name: "Classic Denim Jacket",
          description:
            "A versatile classic denim jacket perfect for casual outings.",
          price: 85,
          userId: user.id,
          imageUrl:
            "https://images.pexels.com/photos/4066149/pexels-photo-4066149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          name: "Retro Leather Boots",
          description:
            "Vintage leather boots with durable craftsmanship and timeless appeal.",
          price: 150,
          userId: user.id,
          imageUrl:
            "https://images.pexels.com/photos/4066149/pexels-photo-4066149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          name: "Silk Scarf",
          description:
            "A luxurious silk scarf to complement any outfit, adding elegance and style.",
          price: 45,
          userId: user.id,
          imageUrl:
            "https://images.pexels.com/photos/4066149/pexels-photo-4066149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          name: "Wool Sweater",
          description:
            "A cozy wool sweater to keep you warm during chilly days.",
          price: 65,
          userId: user.id,
          imageUrl:
            "https://images.pexels.com/photos/4066149/pexels-photo-4066149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ],
    });
    console.log("Success");
  } catch (err) {
    console.log("error in seed", err);
  } finally {
    await db.$disconnect();
  }
}

main();
