export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-[#CCCCCC] mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
              <p className="text-[#CCCCCC]">
                MODRON ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at www.modron.com or use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white">2.1 Information You Provide</h3>
              <p className="text-[#CCCCCC]">
                When you contact us through our website, we may collect:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>Name and contact information (email address)</li>
                <li>Company or organization name</li>
                <li>Message content and any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-white">2.2 Automatically Collected Information</h3>
              <p className="text-[#CCCCCC]">
                When you visit our website, we automatically collect:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website information</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
              <p className="text-[#CCCCCC]">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage and trends</li>
                <li>Protect against fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Information Sharing and Disclosure</h2>
              <p className="text-[#CCCCCC]">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Data Security</h2>
              <p className="text-[#CCCCCC]">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Your Rights</h2>
              <p className="text-[#CCCCCC]">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Cookies and Tracking Technologies</h2>
              <p className="text-[#CCCCCC]">
                Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Third-Party Services</h2>
              <p className="text-[#CCCCCC]">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. International Data Transfers</h2>
              <p className="text-[#CCCCCC]">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">10. Children's Privacy</h2>
              <p className="text-[#CCCCCC]">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">11. Changes to This Policy</h2>
              <p className="text-[#CCCCCC]">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">12. Contact Us</h2>
              <p className="text-[#CCCCCC]">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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
