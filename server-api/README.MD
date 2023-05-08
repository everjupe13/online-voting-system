
``
// after every change to the schema.prisma file, need to run:
npx prisma generate

// and then also generate the migration with
npx prisma migrate dev --name init

// run prisma studio GUI server
npx prisma studio 
``


``
DROP TABLE IF EXISTS Profile, Stars, Topic, User, Votes, _prisma_migrations;
``