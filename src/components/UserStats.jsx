import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import "../css/userStats.css";

export default function UserStats() {
  const { user } = useUser();
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Create a Firestore query for this user's games
    const q = query(
      collection(db, "games"),
      where("userId", "==", user.id),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    // Subscribe in real time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newGames = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(newGames);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  if (games.length === 0)
    return <p className="user-stats">No games yet — go play!</p>;

  function timeAgo(timestamp) {
    if (!timestamp) return "";
    const now = new Date();
    const date = timestamp.toDate();
    const diff = now - date;

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const days = Math.floor(hr / 24);

    if (sec < 60) return "just now";
    if (min < 60) return `${min} min${min > 1 ? "" : "s"} ago`;
    if (hr < 24) return `${hr} hr${hr > 1 ? "" : "s"} ago`;
    if (days < 7) return `${days} day${days > 1 ? "" : "s"} ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="stats-container">
      <h2>Your Recent Games</h2>
      <ul>
        {games.map((g) => (
          <li key={g.id}>
            <span className="word">{g.solution}</span>
            <span className="time">{timeAgo(g.createdAt)}</span>
            <span className={`result ${g.won ? "won" : "lost"}`}>
              {g.won ? " Won" : " Lost"} ({g.turns}/6)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
