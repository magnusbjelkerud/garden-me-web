import Image from "next/image";

const serif = { fontFamily: "var(--font-serif)" };

/**
 * The one navigation, fixed to the top of every page of the site.
 *
 * It used to live inline in the front page and scroll away with everything
 * else, which was tolerable when there were nineteen features and is not now.
 * The subpages had no navigation at all — from the FAQ the only way to the
 * pricing was back through the front door.
 *
 * Deliberately NOT in the root layout: /hage/[id] is the garden a neighbour
 * opens while holding a watering can, and it should carry no marketing chrome
 * whatever. So each page that wants the navigation asks for it.
 *
 * The links are absolute (`/#pricing` rather than `#pricing`) so that the same
 * component works from the front page and from three levels of subpage.
 */
export default function SiteNav() {
  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/hvorfor", label: "Why" },
    // Norsk side i en engelsk meny, som /hvorfor. Ordet virker på begge språk.
    { href: "/hageansatt", label: "Quiz" },
    { href: "/faq", label: "FAQ" },
    { href: "/support", label: "Support" },
  ];

  return (
    <div
      className="sticky top-0 z-50"
      style={{
        // Not quite opaque, so the page moves beneath it rather than vanishing
        // under a lid. The blur is what keeps the type legible when a dark
        // section slides past.
        backgroundColor: "rgba(246, 241, 230, 0.88)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid #e5ddc8",
      }}
    >
      <nav className="flex items-center justify-between gap-4 px-6 py-4 max-w-5xl mx-auto">
        {/* The wordmark is the way home from anywhere on the site — people reach
            for it before they reach for the back button. */}
        <a href="/" aria-label="Garden Me — home" className="flex items-center gap-3 hover:opacity-70 transition-opacity shrink-0">
          <Image src="/logo.png" alt="Garden Me" width={32} height={32} />
          <span style={{ ...serif, color: "#2c3517" }} className="text-xl sm:text-2xl font-semibold tracking-wide">
            Garden Me
          </span>
        </a>
        {/* On a narrow telephone four links and a wordmark will not sit on one
            line, so the row scrolls sideways rather than wrapping into two. */}
        <div
          className="flex gap-5 sm:gap-8 text-sm tracking-wide overflow-x-auto"
          style={{ color: "#4d5a2a", scrollbarWidth: "none" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:opacity-60 transition-opacity whitespace-nowrap">
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
