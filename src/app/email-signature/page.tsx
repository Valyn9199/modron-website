export default function EmailSignaturePreview() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">MODRON Email Signature Preview</h1>
        
        {/* Compact Version */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Compact Version (with Icon)</h2>
          <div className="border border-gray-300 p-6 bg-white">
            <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'Arial, sans-serif', fontSize: '17px', color: '#333333', lineHeight: '1.5' }}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '18px', verticalAlign: 'middle' }}>
                    <img src="/MODRON_ICON.png" alt="MODRON" style={{ height: '48px', width: '48px', display: 'block' }} />
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    <div style={{ color: '#000000', fontWeight: 'bold', fontSize: '20px', marginBottom: '3px' }}>Nathan Polito</div>
                    <div style={{ color: '#666666', fontSize: '17px', marginBottom: '3px' }}>CEO & Founder | MODRON</div>
                    <div style={{ color: '#666666', fontSize: '15px' }}>
                      <a href="mailto:nathan@modron.com" style={{ color: '#32ca73', textDecoration: 'none' }}>nathan@modron.com</a> | 
                      <a href="https://www.modron.com" style={{ color: '#32ca73', textDecoration: 'none' }}> www.modron.com</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Open <code className="bg-gray-100 px-2 py-1 rounded">email-signature-ready.html</code> in your editor</li>
            <li>Copy the HTML code</li>
            <li>Paste into your email client&apos;s signature settings</li>
            <li>Make sure to update the image URLs if your site uses a different domain</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
