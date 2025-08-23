import "./ProfileLoad.css";

function ProfileLoad() {
  return (
    <div className="phs-card">
      <div className="phs-header">
        {/* Avatar Skeleton */}
        <div className="phs-avatar-wrap">
          <div className="phs-avatar-glow" />
          <div className="phs-avatar" />
          <div className="phs-pro-dot" />
        </div>

        {/* User Info Skeleton */}
        <div className="phs-user">
          <div className="phs-line lg" />
          <div className="phs-line md" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="phs-stats-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="phs-stat-card">
            <div className="phs-stat-glow" />
            <div className="phs-sheen" />
            <div className="phs-stat-inner">
              {/* Stat Header */}
              <div className="phs-stat-top">
                <div className="phs-stat-lines">
                  <div className="phs-line sm" style={{ width: "6rem" }} />
                  <div className="phs-line lg" style={{ width: "4rem", height: "2rem" }} />
                  <div className="phs-line sm" style={{ width: "8rem" }} />
                </div>
                <div className="phs-icon-skel" />
              </div>

              {/* Stat Footer */}
              <div className="phs-stat-footer">
                <div className="phs-dot" />
                <div className="phs-line xs" />
                <div className="phs-line sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileLoad;