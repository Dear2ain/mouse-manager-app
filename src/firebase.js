import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // 여기에 Firebase 구성 객체를 붙여넣습니다
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);