const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.visit.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.client.deleteMany();

  const owners = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-0101',
      address: '123 Maple St, Springfield',
      pets: {
        create: [
          {
            name: 'Buddy',
            species: 'Dog',
            breed: 'Golden Retriever',
            sex: 'Neutered Male',
            weight: 32.5,
            microchipNumber: '985112345678',
            rabiesTag: 'R-2024-001',
            preferredProvider: 'Dr. Smith',
            referralSource: 'Friend Recommendation',
            notes: 'Very friendly.',
          },
          {
            name: 'Mittens',
            species: 'Cat',
            breed: 'Tabby',
            sex: 'Spayed Female',
            weight: 4.2,
            rabiesTag: 'R-2024-002',
            preferredProvider: 'Dr. Jones',
            referralSource: 'Google Search',
            notes: 'A bit shy.',
          },
          {
            name: 'Rex',
            species: 'Dog',
            breed: 'German Shepherd',
            sex: 'Male',
            weight: 35.0,
            rabiesTag: 'R-2024-003',
            notes: 'Needs muzzle for exams.',
          },
        ],
      },
    },
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      phone: '555-0201',
      address: '456 Oak Ave, Riverdale',
      pets: {
        create: [
          {
            name: 'Charlie',
            species: 'Dog',
            breed: 'Beagle',
            sex: 'Male',
            weight: 12.0,
            notes: 'Loves treats.',
          },
          {
            name: 'Luna',
            species: 'Cat',
            breed: 'Siamese',
            sex: 'Female',
            weight: 3.8,
          },
        ],
      },
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.j@example.com',
      phone: '555-0301',
      pets: {
        create: [
          {
            name: 'Goldie',
            species: 'Other',
            breed: 'Goldfish',
            sex: 'Unknown',
            weight: 0.1,
          },
          {
            name: 'Flash',
            species: 'Reptile',
            breed: 'Turtle',
            sex: 'Male',
            weight: 0.5,
          },
        ],
      },
    },
  ];

  console.log('Seeding owners and pets...');
  for (const owner of owners) {
    await prisma.client.create({ data: owner });
  }

  // Get created data back to link appointments
  const allOwners = await prisma.client.findMany({ include: { pets: true } });

  console.log('Seeding appointments...');
  const now = new Date();
  now.setMinutes(0, 0, 0);

  const appointments = [
    {
      startTime: new Date(now.getTime() + 1 * 60 * 60 * 1000), // +1 hour
      endTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      description: 'Annual Checkup',
      status: 'Scheduled',
      clientId: allOwners[0].id,
      petId: allOwners[0].pets[0].id,
    },
    {
      startTime: new Date(now.getTime() + 3 * 60 * 60 * 1000), // +3 hours
      endTime: new Date(now.getTime() + 3.5 * 60 * 60 * 1000),
      description: 'Vaccination',
      status: 'Scheduled',
      clientId: allOwners[1].id,
      petId: allOwners[1].pets[0].id,
    },
    {
      startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000), // +1 day
      endTime: new Date(now.getTime() + 25 * 60 * 60 * 1000),
      description: 'Surgery',
      status: 'Scheduled',
      clientId: allOwners[2].id,
      petId: allOwners[2].pets[0].id,
    },
  ];

  for (const apt of appointments) {
    await prisma.appointment.create({ data: apt });
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
