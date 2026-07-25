import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function Footer({ isTechnologyPage }) {
  const logoSrc = `${import.meta.env.BASE_URL}ilumaa_logo.png`;

  const quickLinks = isTechnologyPage
    ? [
        { label: "Home", href: "/" },
        { label: "Tech", href: "/technology-solutions" },
        { label: "Connect", href: "/#connect" },
      ]
    : [
        { label: "Services", href: "/#services" },
        { label: "Solutions", href: "/#solutions" },
        { label: "Tech", href: "/technology-solutions" },
        { label: "Connect", href: "/#connect" },
      ];

  const chips = [
    "Human Intelligence",
    "Strategy",
    "Technology",
    "AI",
    "Analytics",
    "Business Transformation",
  ];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.8fr_0.8fr_0.72fr]">
          <div>
            <img
              src={logoSrc}
              alt="ILUMAA"
              className="h-16 w-auto sm:h-20"
            />
            <p className="mt-5 max-w-sm text-sm leading-8 text-slate-600">
              Delivering integrated business solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-slate-600"
                >
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-8 text-slate-500">
              Where Human Intelligence Meets Technology.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-slate-950">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm uppercase tracking-[0.14em] text-slate-600 transition hover:text-slate-950"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-slate-950">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-accent-gold" />
                <span>connect@ilumaa.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-accent-gold" />
                <span>+91-9810927437</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-accent-gold" />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg font-bold text-slate-950">Follow Us</h3>
            <div className="mt-5 flex flex-col gap-4">
              <a
                
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-slate-600 transition hover:text-slate-950"
              >
                <Linkedin size={16} className="text-accent-cyan" />
                LinkedIn
              </a>
              <a
                
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-slate-600 transition hover:text-slate-950"
              >
                <Instagram size={16} className="text-accent-cyan" />
                Instagram
              </a>
              <a
                
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-slate-600 transition hover:text-slate-950"
              >
                <Facebook size={16} className="text-accent-cyan" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          Copyright {new Date().getFullYear()} ILUMAA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
