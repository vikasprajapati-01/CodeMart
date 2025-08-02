import { Blocks } from "lucide-react";
import Link from "next/link";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gradient-line" />
      <div className="footer-container">
        <div className="footer-content">
            
          <div className="footer-branding">
            <Blocks className="icon" />
            <span>Built for developers, by developers</span>
          </div>

          <div className="footer-links">
            <Link href="/support" className="footer-link">
              Support
            </Link>
            <Link href="/privacy" className="footer-link">
              Privacy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;