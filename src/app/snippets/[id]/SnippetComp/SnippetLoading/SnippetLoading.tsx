import Navbar from "@/components/Navbar/Navbar";
import "./SnippetLoading.css";

function SnippetLoading() {
  return (
    <div className="skeleton-page">
      <Navbar />
      <main className="skeleton-main">
        <div className="skeleton-content">
          <div className="skeleton-card skeleton-header">
            <div className="skeleton-header-top">
              <div className="skeleton-header-left">
                <div className="skeleton-icon" />
                <div className="skeleton-header-info">
                  <div className="skeleton-title" />
                  <div className="skeleton-meta">
                    <div className="skeleton-meta-item" />
                    <div className="skeleton-meta-item" />
                  </div>
                </div>
              </div>
            </div>
            <div className="skeleton-editor" />
          </div>

          <div className="skeleton-card skeleton-comments">
            <div className="skeleton-comments-title" />
            <div className="skeleton-comments-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-comment">
                  <div className="skeleton-avatar" />
                  <div className="skeleton-comment-content">
                    <div className="skeleton-comment-author" />
                    <div className="skeleton-comment-text" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SnippetLoading;