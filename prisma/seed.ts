/// <reference types="node" />
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  try {
    // Clear existing data
    await prisma.appointment.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.client.deleteMany();
    console.log('Cleared existing data.');

    // Create clients with their pets and appointments using nested writes
    // Client 1: Sarah Johnson
    const client1 = await prisma.client.create({
      data: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '555-0101',
        secondaryPhone: '555-0102',
        address: '123 Oak Street, Springfield, IL 62701',
        emergencyContactName: 'Mike Johnson',
        emergencyContactPhone: '555-0103',
        notes: 'Prefers morning appointments',
        pets: {
          create: [
            {
              name: 'Max',
              species: 'Dog',
              breed: 'Golden Retriever',
              sex: 'Male',
              weight: 32.5,
              color: 'Golden',
              birthDate: new Date('2020-03-15'),
              microchipNumber: 'MC123456789',
              rabiesTag: 'RT-2024-001',
              preferredProvider: 'Dr. Smith',
              referralSource: 'Friend referral',
              notes: 'Very friendly, loves treats. Allergic to chicken.',
              // We can even create appointments directly here if we want strictly nested structure
              // but appointments relate to both client and pet, so clearer to do after or use variables
            },
            {
              name: 'Luna',
              species: 'Cat',
              breed: 'Siamese',
              sex: 'Female',
              weight: 4.2,
              color: 'Seal Point',
              birthDate: new Date('2021-07-22'),
              microchipNumber: 'MC987654321',
              rabiesTag: 'RT-2024-002',
              preferredProvider: 'Dr. Smith',
              notes: 'Indoor cat, shy with strangers.',
            },
          ],
        },
      },
      include: {
        pets: true,
      },
    });

    // Client 2: Michael Chen
    const client2 = await prisma.client.create({
      data: {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@email.com',
        phone: '555-0201',
        address: '456 Maple Avenue, Springfield, IL 62702',
        notes: 'First-time pet owner',
        pets: {
          create: [
            {
              name: 'Buddy',
              species: 'Dog',
              breed: 'Labrador Mix',
              sex: 'Male',
              weight: 28.0,
              color: 'Black',
              birthDate: new Date('2019-11-10'),
              microchipNumber: 'MC456789123',
              rabiesTag: 'RT-2024-003',
              preferredProvider: 'Dr. Johnson',
              referralSource: 'Online search',
              notes: 'Rescue dog, very energetic.',
            },
          ],
        },
      },
      include: {
        pets: true,
      },
    });

    // Client 3: Emily Rodriguez
    const client3 = await prisma.client.create({
      data: {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '555-0301',
        secondaryPhone: '555-0302',
        address: '789 Pine Road, Springfield, IL 62703',
        emergencyContactName: 'Carlos Rodriguez',
        emergencyContactPhone: '555-0303',
        pets: {
          create: [
            {
              name: 'Whiskers',
              species: 'Cat',
              breed: 'Domestic Shorthair',
              sex: 'Male',
              weight: 5.5,
              color: 'Tabby',
              birthDate: new Date('2018-05-03'),
              microchipNumber: 'MC789123456',
              rabiesTag: 'RT-2024-004',
              notes: 'Senior cat, requires special diet.',
            },
            {
              name: 'Mittens',
              species: 'Cat',
              breed: 'Persian',
              sex: 'Female',
              weight: 4.8,
              color: 'White',
              birthDate: new Date('2022-01-18'),
              microchipNumber: 'MC321654987',
              rabiesTag: 'RT-2024-005',
              notes: 'Requires regular grooming.',
            },
            {
              name: 'Charlie',
              species: 'Dog',
              breed: 'Beagle',
              sex: 'Male',
              weight: 12.3,
              color: 'Tri-color',
              birthDate: new Date('2021-09-25'),
              microchipNumber: 'MC654987321',
              rabiesTag: 'RT-2024-006',
              preferredProvider: 'Dr. Johnson',
              notes: 'Loves to howl, very vocal.',
            },
          ],
        },
      },
      include: {
        pets: true,
      },
    });

    // Client 4: David Thompson
    const client4 = await prisma.client.create({
      data: {
        firstName: 'David',
        lastName: 'Thompson',
        email: 'david.thompson@email.com',
        phone: '555-0401',
        address: '321 Birch Lane, Springfield, IL 62704',
        notes: 'Owns a small farm with multiple animals',
        pets: {
          create: [
            {
              name: 'Daisy',
              species: 'Dog',
              breed: 'Border Collie',
              sex: 'Female',
              weight: 18.5,
              color: 'Black and White',
              birthDate: new Date('2019-04-12'),
              microchipNumber: 'MC147258369',
              rabiesTag: 'RT-2024-007',
              preferredProvider: 'Dr. Smith',
              referralSource: 'Veterinarian referral',
              notes: 'Working farm dog, very intelligent.',
            },
            {
              name: 'Rocky',
              species: 'Dog',
              breed: 'German Shepherd',
              sex: 'Male',
              weight: 35.2,
              color: 'Black and Tan',
              birthDate: new Date('2018-08-30'),
              microchipNumber: 'MC369258147',
              rabiesTag: 'RT-2024-008',
              notes: 'Guard dog, protective of property.',
            },
            {
              name: 'Snowball',
              species: 'Rabbit',
              breed: 'Dutch',
              sex: 'Female',
              weight: 2.1,
              color: 'White with black markings',
              birthDate: new Date('2022-06-15'),
              notes: 'Pet rabbit, lives in barn.',
            },
            {
              name: 'Clucky',
              species: 'Chicken',
              breed: 'Rhode Island Red',
              sex: 'Female',
              weight: 2.8,
              color: 'Red-brown',
              birthDate: new Date('2023-03-20'),
              notes: 'Egg-laying hen, part of small flock.',
            },
          ],
        },
      },
      include: {
        pets: true,
      },
    });

    console.log('Seeded Client and Patient Data.');

    // Create sample appointments
    // We can confidently access pets array because we used include: { pets: true }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(14, 0, 0, 0);

    // Appointment for Sarah's first pet (Max)
    await prisma.appointment.create({
      data: {
        startTime: tomorrow,
        endTime: new Date(tomorrow.getTime() + 30 * 60000), // 30 minutes later
        description: 'Annual checkup and vaccinations',
        status: 'Scheduled',
        client: { connect: { id: client1.id } },
        patient: { connect: { id: client1.pets[0].id } },
      },
    });

    // Appointment for Emily's first pet (Whiskers)
    await prisma.appointment.create({
      data: {
        startTime: nextWeek,
        endTime: new Date(nextWeek.getTime() + 45 * 60000), // 45 minutes later
        description: 'Follow-up examination',
        status: 'Scheduled',
        client: { connect: { id: client3.id } },
        patient: { connect: { id: client3.pets[0].id } },
      },
    });

    console.log('✅ Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log('- 4 clients created');
    console.log('- 10 patients created (connected via nested writes)');
    console.log('- 2 appointments created');
  } catch (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
