# Old A ONE Webpage Findings

The old page is titled “QR Portal - A ONE UNISEX SALON.” Its visual language is a light pink background with white cards, black bold typography, pastel service icons, and a black rectangular A ONE logo with scissors. The logo is the actual brand treatment and should replace generated marks.

The page’s main action structure is practical and customer-focused: Call, Google Directions, Enquire, Book Appointments, Instant/Self Checkin, Packages, Memberships, Offers, Photo Gallery, Service Providers, Reviews, Feedback, Instagram, and WhatsApp.

Confirmed contact actions from the page are phone `9730510517`, Google Directions link `https://maps.app.goo.gl/tZdJL9xggo6fZRxC8`, Instagram `https://www.instagram.com/aone_salon_spa/`, and WhatsApp `https://api.whatsapp.com/send?phone=919730510517&text=Hello!%20I%20am%20interested%20in%20your%20services.%20Please%20text%20back.`

The page uses the original logo image at `https://crm2025.geteasysoftware.com/aonesalon/upload/1754960133.jpg`. The redesigned site should retain a monochrome black/white/grey system while making these actions visually prominent and retaining the interactive, photo-led service menu.

## Gallery Page Findings

The old gallery page uses a pale pink background with a simple header, the authentic A ONE logo, and a photo grid of real salon work. The gallery includes before-and-after hair images, long-hair results, colour work, styling, men’s grooming, and salon branding/interior moments. The source page contains real image assets under `https://crm2025.geteasysoftware.com/aonesalon/upload/`, including files named like `docsWhatsApp Image 2025-10-09 at 1.45.40 AM.jpeg`, several numbered variants, and September 2025 portfolio images. The new homepage should add a dedicated “Our Work” gallery with a monochrome treatment, mixed aspect ratios, category labels, and a link to Instagram for the complete live portfolio.

## Service Providers

The old provider page lists three team members: **Sakshi — Beautician**, **Faiz — Hair dresser**, and **Priti — Beautician**. The page uses simple profile cards with role labels and portrait-style avatar imagery. These names may be used in the new provider section and preferred-provider booking field because they were directly visible on the supplied old A ONE webpage.

## Live Preview Booking Verification

The live A ONE preview loads successfully after the full-stack upgrade. The booking UI exposes the manual service field, date input, preferred provider select with Any available provider, Sakshi, Faiz, and Priti, and the expanded time-slot buttons. The service menu is visible with separate subsection headings and ADD controls, and the front-page Call A ONE and Locate Us actions remain present. No production appointment records were created during this visual verification.

## Persistence Verification Note

The post-persistence preview loaded and exposed the provider selector, service field, date field, and time slots. A browser click/selection check was attempted without submitting the form, so no test appointment records were created. The page-level build and Vitest suite both passed; a real production booking should be tested by the salon with genuine customer details rather than fabricated test data.

## Final Order and Video Verification

Desktop and mobile full-page captures show the requested order: existing hero first, the limited ₹1,499 offer immediately after it, the four-section menu next, followed by authentic gallery imagery, booklet and Best Works video area, remaining sections, booking, contact, feedback, and reviews. The Best Works video preview is visible inside the booklet area by default, and the inline MP4 asset is used for browser compatibility. The click-triggered opening animation uses the supplied animation file over a grey transparent overlay before the enlarged video view.

The final desktop and mobile responsive captures were re-run after the menu/provider refinements. They show the creator video inline in the Best Works area. The final Home.tsx click path was checked against the requested behavior: completion or playback error of the separate opening animation closes the grey overlay and opens the creator video lightbox, so the two supplied assets remain correctly mapped without a blank Best Works state.

## Final UI Verification

Desktop and mobile captures confirm that Best Service Providers now appears directly after the four-section menu with Sakshi, Faiz, and Priti, and each provider card can route into booking. The Made to be seen gallery now retains natural color. Menu ADD controls and prices have dedicated layout space for consistent visibility, including on mobile.

## ADD Control Regression Fix

After the overlap report, the service-row grid was corrected so the service name, price, ADD label, and arrow occupy separate columns with fixed minimum widths. Fresh desktop and phone captures confirm the ADD label remains present and does not overlap the price.
