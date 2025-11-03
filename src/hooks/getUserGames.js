import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

/**
 * Get all games for a specific user, sorted by most recent
 */
export async function getUserGames(userId) {
  if (!userId) return [];

  const q = query(
    collection(db, "games"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
