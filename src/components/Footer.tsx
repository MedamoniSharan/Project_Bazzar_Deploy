import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16">
      <div className="container px-6 mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Branding */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Project Bazaar</h3>
            <p>
              Curated, high-quality projects built using modern technologies.
              Ready to launch, easy to customize, made for developers and teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Custom Projects</Link></li>
              <li><Link to="/purchased" className="hover:text-white transition">Purchased Projects</Link></li>
              <li><Link to="/support" className="hover:text-white transition">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-white transition">Refund Policy</Link></li>
              <li><Link to="/license" className="hover:text-white transition">License</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic">
              <p>Building 12B, Floor 14</p>
              <p>Mindspace, Raidurg Metro, Hyderabad</p>
              <p className="mt-2">
                Email: <a href="mailto:studentprojectbazaar@gmail.com" className="hover:text-white transition">studentprojectbazaar@gmail.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-zinc-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">© {new Date().getFullYear()} Project Bazaar. All rights reserved.</p>
          
          {/* Social Icons */}
          <div className="flex gap-6">
            {[
              { href: "https://www.instagram.com/studentprojectbazaar/", label: "Instagram", icon: "instagram" },
              { href: "https://www.youtube.com/@StudentProjectBazaar", label: "YouTube", icon: "youtube" },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-white transition-transform duration-200 hover:scale-110"
              >
                {getSocialIcon(icon)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Icon SVG Generator
function getSocialIcon(type: string) {
  switch (type) {
    case "instagram":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="0.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22.54 6.42A2.78 2.78 0 0 0 20.59 4 87.92 87.92 0 0 0 12 4 87.92 87.92 0 0 0 3.41 4 2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2 87.92 87.92 0 0 0 8.59.42 87.92 87.92 0 0 0 8.59-.42 2.78 2.78 0 0 0 1.95-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
        </svg>
      );
    default:
      return null;
  }
}
