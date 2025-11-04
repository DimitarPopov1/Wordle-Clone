import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../css/leaderboard.css";

export default function Leaderboard() {
  const { user } = useUser();
  const [leaders, setLeaders] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "games"), (snapshot) => {
      const allGames = snapshot.docs.map((doc) => doc.data());

      // Aggregate points per user
      const stats = {};
      allGames.forEach((g) => {
        if (!g.userId) return;
        if (!stats[g.userId]) {
          stats[g.userId] = {
            email: g.email || "unknown",
            userId: g.userId,
            points: 0,
          };
        }
        stats[g.userId].points += Number(g.points) || 0;
      });

      // Sort all users by points descending
      const sorted = Object.values(stats).sort((a, b) => b.points - a.points);

      // Find current user rank
      let userRank = null;
      if (user) {
        const index = sorted.findIndex((u) => u.userId === user.id);
        if (index !== -1) userRank = { ...sorted[index], rank: index + 1 };
      }
      setCurrentUserRank(userRank);

      // Keep only top 10 for display
      setLeaders(sorted.slice(0, 5));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      <ul>
        {leaders.map((p, i) => (
          <li
            key={i}
            className={user && p.userId === user.id ? "current-user" : ""}>
            <span className="rank">#{i + 1}</span>
            <span className="email">{p.email.split("@")[0]}</span>
            <span className="score">{p.points} pts</span>
          </li>
        ))}

        {/* Show current user if not in top 10 */}
        {currentUserRank && !leaders.some((p) => p.userId === user.id) && (
          <>
            <li className="separator"></li>
            <li className="current-user">
              <span className="rank">#{currentUserRank.rank}</span>
              <span className="email">
                {currentUserRank.email.split("@")[0]}
              </span>
              <span className="score">{currentUserRank.points} pts</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
