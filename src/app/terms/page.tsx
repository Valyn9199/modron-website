export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-[#CCCCCC] mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
              <p className="text-[#CCCCCC]">
                By accessing and using the MODRON website (www.modron.com), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Description of Service</h2>
              <p className="text-[#CCCCCC]">
                MODRON provides sustainable AI infrastructure services, including green GPU computing solutions, immersion cooling technology, and related consulting services. Our services are designed for enterprise and business use.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. Use License</h2>
              <p className="text-[#CCCCCC]">
                Permission is granted to temporarily access the materials on MODRON's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-[#CCCCCC] ml-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Disclaimer</h2>
              <p className="text-[#CCCCCC]">
                The materials on MODRON's website are provided on an 'as is' basis. MODRON makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Limitations</h2>
              <p className="text-[#CCCCCC]">
                In no event shall MODRON or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MODRON's website, even if MODRON or a MODRON authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Accuracy of Materials</h2>
              <p className="text-[#CCCCCC]">
                The materials appearing on MODRON's website could include technical, typographical, or photographic errors. MODRON does not warrant that any of the materials on its website are accurate, complete, or current. MODRON may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">7. Links</h2>
              <p className="text-[#CCCCCC]">
                MODRON has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MODRON of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">8. Modifications</h2>
              <p className="text-[#CCCCCC]">
                MODRON may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">9. Governing Law</h2>
              <p className="text-[#CCCCCC]">
                These terms and conditions are governed by and construed in accordance with the laws of Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">10. Contact Information</h2>
              <p className="text-[#CCCCCC]">
                If you have any questions about these Terms of Service, please contact us:
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
