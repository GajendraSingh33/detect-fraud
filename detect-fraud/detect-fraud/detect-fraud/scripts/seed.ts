import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const rules = [
    {
      name: "High amount > 2000",
      definition: JSON.stringify({ field: "amount", op: ">", value: 2000, weight: 25 }),
      enabled: true,
    },
    {
      name: "Transaction at unusual hours",
      definition: JSON.stringify({ field: "time", op: "in", value: ["00:00-05:00"], weight: 15 }),
      enabled: true,
    },
    {
      name: "Multiple transactions in short time",
      definition: JSON.stringify({ field: "frequency", op: ">", value: 5, weight: 20 }),
      enabled: true,
    },
    {
      name: "Foreign country transaction",
      definition: JSON.stringify({ field: "country", op: "notIn", value: ["IN"], weight: 30 }),
      enabled: true,
    },
    {
      name: "Card used on new device",
      definition: JSON.stringify({ field: "device", op: "new", value: true, weight: 10 }),
      enabled: true,
    },
  ];

  for (const r of rules) {
  await prisma.rule.upsert({
    where: { name: r.name }, // ✅ works now
    update: {
      definition: r.definition,
      enabled: r.enabled,
    },
    create: {
      name: r.name,
      definition: r.definition,
      enabled: r.enabled,
    },
  });
}

  console.log("✅ Rules seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
