export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Garden Me Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: June 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Data stored locally on your device</h2>
          <p className="text-gray-700 leading-relaxed">
            Garden Me stores your garden data (plants, garden devils, tasks) locally on your device using AsyncStorage. This data does not leave your device except as described below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Weather alerts and push notifications</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            To send weather-based garden alerts when the app is not open, Garden Me may transmit the following to our servers (hosted on Vercel with Upstash Redis):
          </p>
          <ul className="list-none space-y-1 text-gray-700 leading-relaxed">
            <li>• Your Expo push notification token</li>
            <li>• Your approximate location (latitude/longitude)</li>
            <li>• A summary of your plants and garden devils (names and types only)</li>
            <li>• Your language preference and last app-open timestamp</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            This data is used solely to check local weather conditions and send relevant garden alerts. It is automatically deleted after 90 days of inactivity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">AI plant identification</h2>
          <p className="text-gray-700 leading-relaxed">
            Images are sent directly from your device to the Anthropic API for plant and pest identification. Garden Me does not store these images.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Location</h2>
          <p className="text-gray-700 leading-relaxed">
            Location data is used for finding nearby garden centres and for weather alerts. We do not build location history or track movement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Your API key</h2>
          <p className="text-gray-700 leading-relaxed">
            Your Anthropic API key is stored only on your device and is never transmitted to Garden Me servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            Questions? Contact us at{" "}
            <a href="mailto:magnus@bjelkerud.no" className="text-emerald-600 hover:underline">
              magnus@bjelkerud.no
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
