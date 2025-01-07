const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Read the JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf8')); // Replace 'data.json' with your file

const importData = async () => {
    const collectionName = 'questions'; // Replace with your collection name

    for (const [_, record] of Object.entries(data)) {
        const id = String(record.id);
        try {
            await db.collection(collectionName).doc(id).set(record); // Use set() to overwrite data if the doc exists
            console.log(`Imported record: ${id}`);
        } catch (error) {
            console.error(`Error importing record ${id}:`, error);
        }
    }
    console.log('Data import complete');
};

importData();
