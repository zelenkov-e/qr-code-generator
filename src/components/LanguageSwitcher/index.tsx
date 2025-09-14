import Link from "next/link";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const { locales, asPath, locale } = useRouter();

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      {locales?.map((lng) => (
        <Link key={lng} href={asPath} locale={lng}>
          <button
            style={{
              marginRight: 10,
              padding: "6px 12px",
              borderRadius: 6,
              border: lng === locale ? "2px solid #2563eb" : "1px solid #ccc",
              background: lng === locale ? "#2563eb" : "#f9f9f9",
              color: lng === locale ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {lng.toUpperCase()}
          </button>
        </Link>
      ))}
    </div>
  );
}
