const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  { id: "1", name: "Electrician", description: "Electrical installation & repair", icon: "⚡", providerCount: 24 },
  { id: "2", name: "Plumber", description: "Plumbing installation & repair", icon: "🔧", providerCount: 18 },
  { id: "3", name: "Cleaner", description: "Home & office cleaning", icon: "✨", providerCount: 31 },
  { id: "4", name: "Tutor", description: "Academic & professional tutoring", icon: "📚", providerCount: 15 },
  { id: "5", name: "Technician", description: "Computer & electronic repair", icon: "💻", providerCount: 22 },
  { id: "6", name: "Carpenter", description: "Woodwork & furniture services", icon: "🪚", providerCount: 12 },
  { id: "7", name: "Painter", description: "Interior & exterior painting", icon: "🎨", providerCount: 19 },
  { id: "8", name: "Gardener", description: "Landscaping & maintenance", icon: "🌿", providerCount: 14 },
];

const providers = [
  { id: "1", name: "Marcus Johnson", category: "Electrician", categoryId: "1", rating: 4.9, reviewCount: 87, hourlyRate: 65, experience: 12, location: "Downtown", bio: "Licensed electrician with over a decade of experience in residential and commercial wiring.", skills: ["Wiring", "Panel upgrades", "EV chargers", "Smart home"], availability: "available", verified: true, avatar: "MJ", phone: "+15551234567" },
  { id: "2", name: "Sarah Chen", category: "Cleaner", categoryId: "3", rating: 4.8, reviewCount: 124, hourlyRate: 40, experience: 6, location: "Midtown", bio: "Professional cleaning specialist providing eco-friendly deep cleaning services.", skills: ["Deep cleaning", "Move-in/out", "Eco-friendly", "Commercial"], availability: "available", verified: true, avatar: "SC", phone: "+15551234568" },
  { id: "3", name: "David Torres", category: "Plumber", categoryId: "2", rating: 4.7, reviewCount: 63, hourlyRate: 70, experience: 15, location: "West Side", bio: "Master plumber specializing in emergency repairs and bathroom renovations.", skills: ["Emergency repair", "Renovation", "Water heaters", "Drain cleaning"], availability: "busy", verified: true, avatar: "DT", phone: "+15551234569" },
  { id: "4", name: "Emily Park", category: "Tutor", categoryId: "4", rating: 5.0, reviewCount: 42, hourlyRate: 55, experience: 8, location: "University District", bio: "Certified educator specializing in math and science for all age groups.", skills: ["Mathematics", "Physics", "SAT prep", "AP courses"], availability: "available", verified: true, avatar: "EP", phone: "+15551234560" },
  { id: "5", name: "James Miller", category: "Technician", categoryId: "5", rating: 4.6, reviewCount: 91, hourlyRate: 50, experience: 10, location: "Tech Park", bio: "IT professional with expertise in hardware repair and network setup.", skills: ["PC repair", "Networking", "Data recovery", "Smart home"], availability: "available", verified: true, avatar: "JM", phone: "+15551234561" },
  { id: "6", name: "Ana Rodriguez", category: "Painter", categoryId: "7", rating: 4.8, reviewCount: 56, hourlyRate: 45, experience: 9, location: "Arts District", bio: "Creative painter bringing life to spaces with beautiful color transformations.", skills: ["Interior", "Exterior", "Decorative", "Wallpaper"], availability: "available", verified: true, avatar: "AR", phone: "+15551234562" },
];

const sampleRequests = [
  { id: "1", title: "Fix kitchen outlet", description: "Kitchen outlet stopped working, need repair.", category: "Electrician", status: "pending", location: "123 Main St", date: "2026-04-18", budget: 100, customerName: "John Doe" },
  { id: "2", title: "Deep clean apartment", description: "Full apartment deep clean before move-in.", category: "Cleaner", status: "accepted", providerName: "Sarah Chen", location: "456 Oak Ave", date: "2026-04-20", budget: 200, customerName: "Jane Smith" },
  { id: "3", title: "Leaking bathroom faucet", description: "Bathroom faucet leaking continuously.", category: "Plumber", status: "in_progress", providerName: "David Torres", location: "789 Pine Rd", date: "2026-04-15", budget: 150, customerName: "Bob Wilson" },
  { id: "4", title: "Math tutoring for SAT", description: "Need SAT math prep sessions.", category: "Tutor", status: "completed", providerName: "Emily Park", location: "Online", date: "2026-04-10", budget: 220, customerName: "Lisa Brown" },
];

const sampleUsers = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "user", joinedAt: "2026-04-01", status: "active" },
  { id: "u2", name: "Robert Smith", email: "robert@example.com", role: "user", joinedAt: "2026-04-12", status: "active" },
  { id: "u3", name: "Admin Setup", email: "admin@helphive.com", role: "admin", joinedAt: "2026-01-01", status: "active" },
  { id: "u4", name: "Carol White", email: "carol@example.com", role: "user", joinedAt: "2026-04-18", status: "active" },
];

const sampleReviews = [
  { id: "r1", userId: "u1", userName: "Alice Johnson", type: "review", content: "Great platform, found an electrician really fast!", rating: 5, date: "2026-04-15", status: "resolved" },
  { id: "r2", userId: "u2", userName: "Robert Smith", type: "complaint", content: "The plumber I hired didn't show up on time.", date: "2026-04-18", status: "pending", rating: null },
];

async function main() {
  console.log('Seeding database...');
  
  // Clean up existing data to avoid unique constraint errors during re-seed
  await prisma.review.deleteMany();
  await prisma.appUser.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.category.deleteMany();

  for (const c of categories) {
    await prisma.category.create({ data: c });
  }

  for (const p of providers) {
    const data = { ...p, skills: JSON.stringify(p.skills) };
    await prisma.provider.create({ data });
  }

  for (const req of sampleRequests) {
    await prisma.serviceRequest.create({ data: req });
  }

  for (const u of sampleUsers) {
    await prisma.appUser.create({ data: u });
  }

  for (const rev of sampleReviews) {
    await prisma.review.create({ data: rev });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
