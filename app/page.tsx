export default function Home() {
  return (
    <main className="min-h-screen bg-emerald-950 text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        <div className="text-8xl mb-6">🌿</div>
        <h1 className="text-5xl font-bold mb-4">Garden Me</h1>
        <p className="text-2xl font-medium text-emerald-400 mb-6">Your garden, always with you</p>
        <p className="text-lg text-gray-300 leading-relaxed mb-10">
          AI plant identification, seasonal care reminders, pest management, and personalised garden advice — available for iOS and Android.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-950 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <span className="text-xl">🍎</span> App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-lime-400 text-emerald-950 font-semibold px-8 py-4 rounded-xl hover:bg-lime-300 transition-colors"
          >
            <span className="text-xl">▶</span> Google Play
          </a>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-20">
          <li className="bg-emerald-900 rounded-xl px-6 py-4 text-gray-200 leading-relaxed">
            🔍 Identify any plant instantly
          </li>
          <li className="bg-emerald-900 rounded-xl px-6 py-4 text-gray-200 leading-relaxed">
            📅 Year-round care reminders
          </li>
          <li className="bg-emerald-900 rounded-xl px-6 py-4 text-gray-200 leading-relaxed">
            🐌 Track pests &amp; garden devils
          </li>
          <li className="bg-emerald-900 rounded-xl px-6 py-4 text-gray-200 leading-relaxed">
            🌤️ Weather-aware garden alerts
          </li>
        </ul>

        <footer className="text-gray-500 text-sm flex gap-6 justify-center">
          <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
        </footer>
      </div>
    </main>
  );
}
