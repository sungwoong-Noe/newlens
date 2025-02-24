import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

async function testFirebaseConnection() {
  try {
    const testDoc = await addDoc(collection(db, 'test'), {
      test: 'Hello Firebase',
      timestamp: new Date()
    });
    console.log('Test document written with ID: ', testDoc.id);
    return true;
  } catch (e) {
    console.error('Error testing Firebase: ', e);
    return false;
  }
}

// 테스트 실행
testFirebaseConnection().then(success => {
  console.log('Firebase test result:', success ? 'Success' : 'Failed');
}); 