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
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-[1520px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.75fr_0.85fr_0.7fr]">
          <div>
            <a href="/" className="inline-block">
              <img
                src={logoSrc}
                alt="ILUMAA"
                className="h-10 w-auto sm:h-12 object-contain"
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Delivering integrated business solutions.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                >
                  {chip}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm font-medium leading-7 text-slate-700">
              Where Human Intelligence Meets Technology.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold text-slate-950">Quick Links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:translate-x-1 hover:text-blue-600"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold text-slate-950">Contact</h3>
            <div className="mt-5 space-y-3.5 text-sm text-slate-600">
              <a
                href="mailto:connect@ilumaa.com"
                className="flex items-center gap-3 transition hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Mail size={15} />
                </div>
                <span>connect@ilumaa.com</span>
              </a>
              <a
                href="tel:+919810927437"
                className="flex items-center gap-3 transition hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Phone size={15} />
                </div>
                <span>+91-9810927437</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <MapPin size={15} />
                </div>
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-base font-bold text-slate-950">Follow Us</h3>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:translate-x-1 hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Linkedin size={15} />
                </div>
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:translate-x-1 hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover:bg-pink-600 group-hover:text-white">
                  <Instagram size={15} />
                </div>
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:translate-x-1 hover:text-blue-600"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Facebook size={15} />
                </div>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ILUMAA. All rights reserved.</p>
          <p className="text-slate-400">Where Human Intelligence Meets Technology</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
