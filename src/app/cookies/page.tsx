export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8">Cookie Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-[#CCCCCC] mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. What Are Cookies</h2>
              <p className="text-[#CCCCCC]">
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. How We Use Cookies</h2>
              <p className="text-[#CCCCCC]">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Performance Cookies:</strong> Improve website performance and user experience</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-white">3.1 Essential Cookies</h3>
              <p className="text-[#CCCCCC]">
                These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
              </p>

              <h3 className="text-xl font-semibold text-white">3.2 Analytics Cookies</h3>
              <p className="text-[#CCCCCC]">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
              </p>

              <h3 className="text-xl font-semibold text-white">3.3 Performance Cookies</h3>
              <p className="text-[#CCCCCC]">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Third-Party Cookies</h2>
              <p className="text-[#CCCCCC]">
                Our website may use third-party services that set their own cookies. These services include:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>Google Analytics (for website analytics)</li>
                <li>Social media platforms (if you interact with social features)</li>
                <li>Content delivery networks (for improved performance)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Managing Cookies</h2>
              <p className="text-[#CCCCCC]">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse cookies or delete them</li>
                <li><strong>Cookie Consent:</strong> We will ask for your consent before setting non-essential cookies</li>
                <li><strong>Third-Party Opt-outs:</strong> You can opt out of third-party cookies through their respective websites</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Cookie Duration</h2>
              <p className="text-[#CCCCCC]">
                Cookies on our website may be:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you delete them</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Your Choices</h2>
              <p className="text-[#CCCCCC]">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>Accept or decline cookies</li>
                <li>Delete cookies from your device</li>
                <li>Set your browser to refuse cookies</li>
                <li>Contact us with questions about our cookie use</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Updates to This Policy</h2>
              <p className="text-[#CCCCCC]">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. Contact Us</h2>
              <p className="text-[#CCCCCC]">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 mt-4">
                <p className="text-[#999999] mb-2">
                  <strong>Email:</strong> <a href="mailto:contact@modron.com" className="text-green-400 hover:text-green-300">contact@modron.com</a>
                </p>
                <p className="text-[#999999] mb-2">
                  <strong>Address:</strong> Sydney, Australia
                </p>
                <p className="text-[#999999]">
                  <strong>Website:</strong> <a href="https://www.modron.com" className="text-green-400 hover:text-green-300">www.modron.com</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
