import "./MainPage.css";

import Header from "./rootComponents/Header/Header";
import CodePanel from "./rootComponents/CodePanel/CodePanel";
import OutputPanel from "./rootComponents/OutputPanel/OutputPanel";

function MainPage() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <Header />

        <div className="panels-grid">
          <CodePanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
export default MainPage;