import { useNavigate, useSearchParams } from "react-router-dom";
import { DAYS } from "../data/workouts";
import styles from "./WorkoutList.module.css";

const CAT_LABEL = {
  strength: "Strength",
  accessory: "Accessory",
  cardio: "Cardio",
};
const CAT_CLASS = {
  strength: "catStrength",
  accessory: "catAccessory",
  cardio: "catCardio",
};
const ICON_BG = {
  strength: "iconStrength",
  accessory: "iconAccessory",
  cardio: "iconCardio",
};

export default function WorkoutList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDay = Number(searchParams.get("day") ?? 0);
  const navigate = useNavigate();
  const day = DAYS[activeDay];

  function switchDay(idx) {
    setSearchParams({ day: idx });
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.headerLabel}>Your Program</p>
          <h1 className={styles.headerTitle}>GYM PLAN</h1>
          <p className={styles.headerSub}>4-Day Split · Strength + Cardio</p>
        </div>
        <div className={styles.headerBadge}>4</div>
      </header>

      <div className={styles.tabs}>
        {DAYS.map((d, i) => (
          <button
            key={d.id}
            className={`${styles.tab} ${i === activeDay ? styles.tabActive : ""}`}
            onClick={() => switchDay(i)}
          >
            <span className={styles.tabNum}>{d.id}</span>
            <span className={styles.tabLabel}>{d.focus.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className={styles.dayHeader}>
        <span className={styles.dayTag}>DAY {day.id}</span>
        <span className={styles.dayFocus}>{day.focus}</span>
        <span className={styles.dayCount}>
          {day.exercises.length} exercises
        </span>
      </div>

      <div className={styles.list}>
        {day.exercises.map((ex) => (
          <button
            key={ex.id}
            className={styles.card}
            onClick={() => navigate(`/exercise/${ex.id}?day=${activeDay}`)}
          >
            <div className={`${styles.exIcon} ${styles[ICON_BG[ex.category]]}`}>
              <span>{ex.icon}</span>
            </div>

            <div className={styles.exInfo}>
              <p className={styles.exName}>{ex.name}</p>
              <p className={styles.exMeta}>
                <span
                  className={`${styles.catPill} ${styles[CAT_CLASS[ex.category]]}`}
                >
                  {CAT_LABEL[ex.category]}
                </span>
                {ex.weight !== "—" && (
                  <span className={styles.exWeight}>{ex.weight}</span>
                )}
              </p>
            </div>

            <div className={styles.exRight}>
              <span className={styles.setsBadge}>
                {ex.sets}×{ex.reps}
              </span>
              <svg
                className={styles.chevron}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M9 18l6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
