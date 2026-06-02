import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getExerciseById } from "../data/workouts";
import styles from "./ExerciseDetail.module.css";

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

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function isLocalVideo(url) {
  if (!url) return false;
  return (
    url.startsWith("./") ||
    url.startsWith("/") ||
    /\.(mp4|webm|ogg|mov)$/i.test(url)
  );
}

export default function ExerciseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const result = getExerciseById(id);
  const { exercise: ex, day } = result;
  const [searchParams] = useSearchParams();
  const dayParam = searchParams.get("day") ?? 0;
  if (!result) {
    return (
      <div className={styles.notFound}>
        <p>Exercise not found.</p>
        <button onClick={() => navigate(`/?day=${dayParam}`)}>← Back</button>
      </div>
    );
  }

  const ytId = getYouTubeId(ex.videoUrl);
  const localVideo = !ytId && isLocalVideo(ex.videoUrl);

  return (
    <div className={styles.page}>
      <button
        className={styles.back}
        onClick={() => navigate(`/?day=${dayParam}`)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={styles.backIcon}
        >
          <path
            d="M19 12H5M12 5l-7 7 7 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to workout
      </button>

      <div className={styles.videoWrapper}>
        {ytId ? (
          <iframe
            className={styles.videoFrame}
            src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
            title={`${ex.name} tutorial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : localVideo ? (
          <video
            className={styles.videoFrame}
            src={ex.videoUrl}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <div className={styles.videoPlaceholder}>
            <div className={styles.videoPlayBtn}>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="32"
                height="32"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className={styles.videoPlaceholderText}>No video added yet</p>
            <p className={styles.videoId}>ID: {ex.id}</p>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={`${styles.catPill} ${styles[CAT_CLASS[ex.category]]}`}>
          {CAT_LABEL[ex.category]}
        </span>
        <h1 className={styles.exName}>{ex.name}</h1>
        <p className={styles.exDayTag}>
          Day {day.id} · {day.focus}
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Sets</p>
            <p className={styles.statVal}>{ex.sets}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Reps</p>
            <p className={styles.statValSm}>{ex.reps}</p>
          </div>
          <div className={`${styles.statCard} ${styles.statCardWide}`}>
            <p className={styles.statLabel}>Weight</p>
            <p
              className={
                ex.weight.length > 10 ? styles.statValSm : styles.statVal
              }
            >
              {ex.weight}
            </p>
          </div>
        </div>

        <p className={styles.sectionLabel}>Muscles Worked</p>
        <div className={styles.muscleTags}>
          {ex.muscles.map((m) => (
            <span key={m} className={styles.muscleTag}>
              {m}
            </span>
          ))}
        </div>

        <p className={styles.sectionLabel}>Coaching Tip</p>
        <div className={styles.tipBox}>
          <svg
            className={styles.tipIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
          </svg>
          <p className={styles.tipText}>{ex.tip}</p>
        </div>
      </div>
    </div>
  );
}
