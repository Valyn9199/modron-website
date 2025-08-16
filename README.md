# GreenGPU - Sustainable GPU Computing Solutions

A modern Next.js landing page for GreenGPU, showcasing sustainable GPU computing solutions with a focus on environmental impact and performance.

## 🚀 Features

- **Modern Design**: Built with Next.js 15 and TailwindCSS
- **Responsive Layout**: Optimized for all device sizes
- **Performance Optimized**: Fast loading with Next.js App Router
- **SEO Friendly**: Proper metadata and semantic HTML
- **Accessible**: WCAG compliant design patterns
- **Booking System**: Interactive consultation booking modal
- **Contact Forms**: Email integration with Resend
- **Security**: Enhanced security headers and validation

## 📋 Sections

1. **Hero Section**: Compelling introduction with call-to-action buttons
2. **Mission & Vision**: Company mission and value propositions
3. **Technology & Infrastructure**: Detailed technical overview
4. **Use Cases**: AI workload applications and workflows
5. **Enterprise Features**: Business capabilities and benefits
6. **How It Works**: Process explanation and workflow
7. **Contact & Booking**: Interactive forms for inquiries and consultations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Heroicons (SVG)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Resend account for email functionality

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd green-gpu-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```bash
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@modron.com
CONTACT_EMAIL=contact@modron.com
BOOKING_EMAIL=bookings@modron.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here

# Domain Configuration
NEXT_PUBLIC_SITE_URL=https://www.modron.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
green-gpu-site/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/         # Contact form API
│   │   │   └── booking/         # Booking form API
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── booking-modal.tsx    # Consultation booking modal
│   │   ├── contact-form.tsx     # Contact form component
│   │   └── ui/                  # UI components
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tailwind.config.ts          # TailwindCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🎨 Customization

### Colors
The project uses a custom color palette defined in TailwindCSS. You can modify colors in `tailwind.config.ts`.

### Content
Update the content in `src/app/page.tsx` to match your business needs:
- Hero section messaging
- Mission and vision statements
- Technology and infrastructure details
- Use cases and enterprise features
- Contact information

### Booking System
The booking modal (`src/components/booking-modal.tsx`) can be customized:
- Time slots available for consultations
- Project types and categories
- Form validation rules
- Email templates and recipients

### Styling
All styling is done with TailwindCSS utility classes. The design is fully responsive and follows modern web design principles.

## 📱 Responsive Design

The landing page is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📈 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals: Optimized
- Bundle Size: Minimal with Next.js optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please contact:
- Email: hello@greengpu.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ using Next.js and TailwindCSS
