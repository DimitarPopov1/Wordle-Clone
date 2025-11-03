import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Save a finished Wordle game result to Firestore
 * @param {Object} user - Clerk user object
 * @param {Object} gameData - { solution, isCorrect, turn }
 */
export async function saveGameResult(user, gameData) {
  if (!user) return;

  const pointsForTurns = (turns, won) => {
    if (!won) return 0;
    const scoreMap = { 1: 50, 2: 40, 3: 30, 4: 20, 5: 10, 6: 5 };
    return scoreMap[turns] || 0;
  };

  try {
    const won = gameData.isCorrect;
    const turns = gameData.turn;
    const points = pointsForTurns(turns, won);

    await addDoc(collection(db, "games"), {
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress || "unknown",
      displayName: user.fullName || "Anonymous",
      solution: gameData.solution,
      turns,
      won,
      points,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Game result saved to Firestore!");
  } catch (error) {
    console.error("❌ Error saving game:", error);
  }
}
