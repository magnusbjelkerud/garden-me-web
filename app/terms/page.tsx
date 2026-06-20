export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Garden Me Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: June 2026</p>

        <p className="text-gray-700 leading-relaxed mb-8">
          By using Garden Me you agree to the following:
        </p>

        <ol className="space-y-6">
          <li className="text-gray-700 leading-relaxed">
            <span className="font-semibold">1.</span> Garden Me is a personal garden assistance tool, not a professional horticultural service.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <span className="font-semibold">2.</span> AI identification of plants and pests may be incorrect. You are responsible for verifying information against experts and authoritative sources.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <span className="font-semibold">3.</span> Garden Me is not liable for damage to plants, gardens, property, or health resulting from incorrect identification or incorrect use of information in the app.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <span className="font-semibold">4.</span> We never recommend dangerous chemicals, pesticides, or other harmful substances. All recommendations are based on natural and eco-friendly methods.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <span className="font-semibold">5.</span> The app is provided &ldquo;as is&rdquo; without warranty. Always use common sense and consult experts for important decisions.
          </li>
          <li className="text-gray-700 leading-relaxed">
            <span className="font-semibold">6.</span> Weather alerts are informational only and based on publicly available weather data. Garden Me is not responsible for garden damage resulting from weather events.
          </li>
        </ol>
      </div>
    </main>
  );
}
