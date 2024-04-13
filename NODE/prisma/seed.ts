import { prisma } from '../src/lib/prisma';
async function seed() {
  await prisma.event.create({
    data: {
      id: 'ed3f568e-a138-4e28-a6ab-a13e1ef784c9',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'A conference for Unity developers',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  console.log('Seed complete')
  prisma.$disconnect()
})