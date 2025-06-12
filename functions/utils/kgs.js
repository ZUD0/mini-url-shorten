const admin = require('firebase-admin');

const generateKeys = async (count = 10000) => {
  const db = admin.firestore();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keys = new Set();

  while (keys.size < count) {
    let key = '';
    for (let i = 0; i < 6; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    keys.add(key);
  }

  const batch = db.batch();
  keys.forEach((key) => {
    const partitionId = key[0];
    batch.set(db.collection('keys').doc(key), {
      key,
      status: 'available',
      partition_id: partitionId,
    });
  });

  await batch.commit();
  console.log(`Generated and stored ${keys.size} keys`);
};

module.exports = { generateKeys };