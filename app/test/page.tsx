'use client';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function TestPage() {
  const [status, setStatus] = useState<string>('테스트 중...');

  useEffect(() => {
    async function testFirebase() {
      try {
        // 테스트 컬렉션에 문서 추가
        const testCol = collection(db, 'test');
        await addDoc(testCol, {
          message: 'Test successful',
          timestamp: new Date()
        });

        // 추가한 문서 읽기
        const snapshot = await getDocs(testCol);
        if (!snapshot.empty) {
          setStatus('Firebase 연결 성공! 🎉');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
        setStatus(`Firebase 연결 실패: ${errorMessage}`);
        console.error('Firebase test failed:', error);
      }
    }

    testFirebase();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Firebase 연결 테스트</h1>
      <p>{status}</p>
    </div>
  );
} 