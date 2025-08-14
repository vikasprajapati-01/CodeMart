import './SnippetSkeleton.css'

const CardSkeleton = () => (
  <div className="card-skel">
    <div className="card-skel-inner">
      <div className="card-skel-body">
        <div className="card-skel-header">
          <div className="card-skel-header-left">
            <div className="card-skel-avatar" />
            <div className="card-skel-title-wrap">
              <div className="card-skel-title" />
              <div className="card-skel-subtitle" />
            </div>
          </div>
          <div className="card-skel-pill" />
        </div>

        <div className="card-skel-title-blocks">
          <div className="card-skel-line" style={{ width: "75%", height: "28px" }} />
          <div className="card-skel-line" style={{ width: "50%", height: "20px" }} />
        </div>

        <div className="card-skel-code">
          <div className="card-skel-line" style={{ width: "100%" }} />
          <div className="card-skel-line" style={{ width: "75%" }} />
          <div className="card-skel-line" style={{ width: "50%" }} />
        </div>
      </div>
    </div>
  </div>
);

export default function SnippetsPageSkeleton() {
  return (
    <div className="sps-page">
      <div className="sps-ambient">
        <div className="sps-ambient-circle sps-ambient-left" />
        <div className="sps-ambient-circle sps-ambient-right" />
      </div>

      <div className="sps-container">
        <div className="sps-hero">
          <div
            className="sps-skel sps-skel-rounded"
            style={{ width: "12rem", height: "2rem", margin: "0 auto" }}
          />
          <div
            className="sps-skel"
            style={{ width: "24rem", height: "3rem", margin: "0 auto", borderRadius: "16px" }}
          />
          <div
            className="sps-skel"
            style={{ width: "18rem", height: "1.5rem", margin: "0 auto" }}
          />
        </div>

        <div className="sps-filters">
          <div className="sps-search-bar" />
          <div className="sps-lang-chips">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="sps-lang-chip"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="sps-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}