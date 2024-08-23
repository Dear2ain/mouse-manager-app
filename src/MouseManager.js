import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue, set } from "firebase/database";
import { setPersistence, browserLocalPersistence } from "firebase/database";
import './MouseManager.css';

const MouseManager = () => {
  const [physicalHealth, setPhysicalHealth] = useState(null);
  const [mentalHealth, setMentalHealth] = useState(null);
  const [mood, setMood] = useState(null);
  const [wish, setWish] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(db, browserLocalPersistence)
      .then(() => {
        const statusRef = ref(db, 'mouseStatus');
        onValue(statusRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setPhysicalHealth(data.physicalHealth);
            setMentalHealth(data.mentalHealth);
            setMood(data.mood);
            setWish(data.wish);
          } else {
            setPhysicalHealth(50);
            setMentalHealth(50);
            setMood(50);
          }
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Firebase persistence error:", error);
        setLoading(false);
      });
  }, []);

  const updateDatabase = (newStatus) => {
    set(ref(db, 'mouseStatus'), newStatus);
  };

  const handleChange = (setter) => (e) => {
    const value = Number(e.target.value);
    setter(value);
    updateDatabase({ physicalHealth, mentalHealth, mood, wish, [e.target.name]: value });
  };

  const handleWishChange = (e) => {
    setWish(e.target.value);
    updateDatabase({ physicalHealth, mentalHealth, mood, wish: e.target.value });
  };

  const getColor = (value) => {
    if (value <= 50) return 'red';
    if (value >= 80) return 'green';
    return 'black';
  };

  const getTotalStatus = () => {
    const total = physicalHealth + mentalHealth + mood;
    if (total > 299) return { message: '기분째짐', emoji: '🥳' };
    if (total > 250) return { message: '쪼아', emoji: '😊' };
    if (total > 200) return { message: '삼삼', emoji: '🙂' };
    if (total > 150) return { message: '보통', emoji: '😐' };
    return { message: '우울', emoji: '😢' };
  };

  const { message, emoji } = getTotalStatus();

  if (loading) {
    return <div>로딩 중...</div>;
  }
  
  return (
    <div className="mouse-manager">
      <h2>쥐의 상태 {emoji}</h2>
      <div className="status-item">
        <label>몸 상태:</label>
        <input
          type="range"
          min="0"
          max="100"
          name="physicalHealth"
          value={physicalHealth}
          onChange={handleChange(setPhysicalHealth)}
        />
        <span style={{ color: getColor(physicalHealth) }}>{physicalHealth}</span>
      </div>
      <div className="status-item">
        <label>마음 상태:</label>
        <input
          type="range"
          min="0"
          max="100"
          name="mentalHealth"
          value={mentalHealth}
          onChange={handleChange(setMentalHealth)}
        />
        <span style={{ color: getColor(mentalHealth) }}>{mentalHealth}</span>
      </div>
      <div className="status-item">
        <label>기분 상태:</label>
        <input
          type="range"
          min="0"
          max="100"
          name="mood"
          value={mood}
          onChange={handleChange(setMood)}
        />
        <span style={{ color: getColor(mood) }}>{mood}</span>
      </div>
      <div className="total-status">
        <p>전체 상태: {message} {emoji}</p>
      </div>
      <div className="wish-item">
        <label>쥐의 소원:</label>
        <input
          type="text"
          value={wish}
          onChange={handleWishChange}
          placeholder="쥐의 소원을 입력하세요"
        />
      </div>
    </div>
  );
};

export default MouseManager;