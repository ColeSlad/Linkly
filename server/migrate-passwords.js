// One-time migration script: hashes all plaintext passwords in the DB.
// Run with: node migrate-passwords.js
// Safe to run multiple times — skips already-hashed passwords.

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const SALT_ROUNDS = 12;

async function migrate() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    let migrated = 0;
    let skipped = 0;

    for (const user of users) {
        // bcrypt hashes always start with $2b$ — skip already-hashed passwords
        if (user.password.startsWith('$2b$')) {
            skipped++;
            continue;
        }

        const hashed = await bcrypt.hash(user.password, SALT_ROUNDS);
        await User.updateOne({ _id: user._id }, { password: hashed });
        migrated++;
        console.log(`Migrated: ${user.email}`);
    }

    console.log(`\nDone. Migrated: ${migrated}, Skipped (already hashed): ${skipped}`);
    await mongoose.disconnect();
}

migrate().catch(err => {
    console.error(err);
    process.exit(1);
});
