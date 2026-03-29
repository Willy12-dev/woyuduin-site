export default function Privacy() {
  return (
    <main className="min-h-screen px-6 py-20" style={{ backgroundColor: "#08080f" }}>
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-purple-400 text-sm font-bold mb-8 block">← Back to Home</a>

        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-white/30 text-sm mb-12">Last updated: March 30, 2026</p>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. Introduction</h2>
            <p>
              Woyuduin (&quot;the App&quot;) is developed and operated by Flowi Group Ltd (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
              a company registered in Kenya. We are committed to protecting your privacy and personal data.
              This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. Information We Collect</h2>
            <h3 className="text-white/80 font-semibold mb-2">Account Information</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Email address (for account creation and login)</li>
              <li>Display name (optional, chosen by you)</li>
              <li>Password (encrypted, never stored in plain text)</li>
            </ul>

            <h3 className="text-white/80 font-semibold mb-2">App Usage Data (Stored Locally)</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Streak start date and progress</li>
              <li>Urge logs (intensity level and action taken)</li>
              <li>Journal entries and mood tracking</li>
              <li>Habit tracking data</li>
              <li>Blocked domain preferences</li>
            </ul>

            <h3 className="text-white/80 font-semibold mb-2">Data We Do NOT Collect</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Browsing history</li>
              <li>Screenshots or screen content</li>
              <li>Contacts or phone data</li>
              <li>Location data</li>
              <li>Photos or media files</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and maintain the App&apos;s core functionality</li>
              <li>To sync your progress across devices (if you create an account)</li>
              <li>To enable community features (Brotherhood posts, leaderboard)</li>
              <li>To match you with accountability partners</li>
              <li>To process payments for premium features</li>
              <li>To send password reset emails when requested</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. Data Storage & Security</h2>
            <p className="mb-3">
              Sensitive data (PIN, payment tokens) is stored using Android Keystore-backed encrypted storage
              on your device. Non-sensitive app data is stored locally using standard device storage.
            </p>
            <p className="mb-3">
              Account data and community features are stored on Supabase (hosted on AWS in Europe) with
              Row Level Security (RLS) enabled — meaning users can only access their own data.
            </p>
            <p>
              All network communication uses HTTPS/TLS encryption.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. VPN Service</h2>
            <p>
              Woyuduin uses Android&apos;s VPN service to create a local DNS-based content filter on your device.
              This VPN operates entirely on your device — no data is routed through external servers.
              The VPN is used solely to block access to adult content domains at the DNS level.
              We do not monitor, log, or transmit any of your internet traffic.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Supabase</strong> — Authentication and database (EU servers)</li>
              <li><strong>NOWPayments</strong> — Cryptocurrency payment processing</li>
              <li><strong>Vercel</strong> — Website hosting</li>
            </ul>
            <p className="mt-3">
              We do not use any advertising SDKs, analytics trackers, or data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">7. Community Features</h2>
            <p>
              When you post in the Brotherhood community, your username, avatar, streak count, and post
              content are visible to other users. You can delete your own posts at any time.
              Private data (journal entries, urge logs, habit tracking) is never shared with other users.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">8. Couples Mode</h2>
            <p>
              If you enable Couples Mode, you choose exactly what information to share with your partner
              (streak progress, urge count, weekly reports). You can revoke access at any time.
              Your partner receives only the data you explicitly authorize.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">9. Data Retention & Deletion</h2>
            <p className="mb-3">
              Your data is retained as long as your account is active. You can request deletion of your
              account and all associated data at any time by contacting us at privacy@woyuduin.com.
            </p>
            <p>
              Upon account deletion, all personal data is permanently removed from our servers within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">10. Children&apos;s Privacy</h2>
            <p>
              Woyuduin is intended for users aged 18 and above. We do not knowingly collect personal
              information from children under 18. If we become aware that we have collected data from
              a child under 18, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">11. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of significant
              changes through the App or via email. Continued use of the App after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">13. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your data, contact us at:
            </p>
            <ul className="mt-2 space-y-1">
              <li><strong>Email:</strong> privacy@woyuduin.com</li>
              <li><strong>Company:</strong> Flowi Group Ltd</li>
              <li><strong>Location:</strong> Nairobi, Kenya</li>
            </ul>
          </section>
        </div>

        <p className="text-center text-white/20 text-xs mt-16">
          &copy; {new Date().getFullYear()} Flowi Group Ltd. All rights reserved.
        </p>
      </div>
    </main>
  );
}
