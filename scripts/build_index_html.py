import xml.etree.ElementTree as ET

tree_dark = ET.parse('dark-theme.svg')
root_dark = tree_dark.getroot()
paths_dark = [e for e in root_dark.iter() if e.tag.endswith('path')]

tree_white = ET.parse('white-theme.svg')
root_white = tree_white.getroot()
paths_white = [e for e in root_white.iter() if e.tag.endswith('path')]

d = {
    'p19': paths_dark[19].attrib['d'],
    'p20': paths_dark[20].attrib['d'],
    'p21': paths_dark[21].attrib['d'],
    'p22': paths_dark[22].attrib['d'],
    'p23': paths_dark[23].attrib['d'],
    'p24': paths_dark[24].attrib['d'],
    'p25': paths_dark[25].attrib['d'],
    'p26': paths_dark[26].attrib['d'],
    'p27': paths_dark[27].attrib['d'],
    'p28': paths_dark[28].attrib['d'],
    'p29': paths_dark[29].attrib['d'],
    'p30': paths_dark[30].attrib['d'],
    'p31': paths_dark[31].attrib['d'],
    'p32': paths_dark[32].attrib['d'],
    'p33': paths_dark[33].attrib['d'],
    'p34': paths_dark[34].attrib['d'],
    'p35': paths_dark[35].attrib['d'],
}

html_content = f'''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alpha cube | Full-Stack Development Agency</title>
  <meta name="description" content="Alpha cube is a full-stack development agency that goes beyond just delivering the product and actually looking after it post-deployment.">
  <meta name="color-scheme" content="dark light">
  <script>
    try {{
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.querySelector('meta[name="color-scheme"]').content = savedTheme;
    }} catch(e) {{}}
  </script>
  <link rel="icon" type="image/png" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700;1,900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="site-container">
    <!-- Navbar -->
    <header class="site-header">
      <div class="header-inner">
        <a href="#" class="brand" aria-label="Alpha cube home">
          <img src="assets/logo.png" alt="Alpha cube logo" class="brand-logo" width="48" height="48">
          <span class="brand-name">Alpha cube</span>
        </a>

        <div class="header-actions">
          <button id="theme-toggle" class="theme-btn" aria-label="Toggle color theme" title="Toggle dark/light theme">
            <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-inner">
          <div class="hero-copy">
            <h1 class="hero-title">Better call us</h1>
            <p class="hero-desc">
              Alpha cube is a full-stack engineering agency for founders and growing companies. We build high-throughput web applications and resilient backends, then stay on call 24/7 post-deployment.
            </p>
            <div class="hero-cta-wrap">
              <a href="#contact" class="btn-get-in-touch" id="hero-cta">
                <span class="btn-label">Get in touch</span>
                <img src="assets/btn-squiggly.svg" alt="" class="btn-squiggly" aria-hidden="true">
              </a>
            </div>
            <div class="hero-trust-bar">
              <span class="trust-item"><span class="trust-bullet" aria-hidden="true"></span> 50+ Web apps delivered</span>
              <span class="trust-item"><span class="trust-bullet" aria-hidden="true"></span> 99.99% Production uptime</span>
              <span class="trust-item"><span class="trust-bullet" aria-hidden="true"></span> 15-Min midnight response</span>
            </div>
          </div>

          <div class="hero-media">
            <img id="saul-image" src="assets/saul-dark.png" alt="Better call us" class="hero-saul" width="580" height="620">
          </div>
        </div>
      </section>

      <!-- What We Do Bento Grid -->
      <section class="what-we-do-section" id="services">
        <div class="section-header-wrap">
          <h2 class="section-heading">What we do</h2>
        </div>

        <div class="bento-layout">
          <!-- Top Row: Card 1 (Square) and Card 2 (Wide) -->
          <article class="bento-box bento-box-1">
            <div class="bento-box-inner">
              <span class="bento-tag">Full-Stack</span>
              <h3 class="bento-title">Web Applications</h3>
              <p class="bento-desc">Production-grade web apps built with modern frameworks. Fast, responsive, and engineered for high traffic.</p>
              <span class="bento-meta">Next.js &middot; React &middot; TypeScript</span>
            </div>
          </article>

          <article class="bento-box bento-box-2">
            <div class="bento-box-inner">
              <span class="bento-tag">Architecture</span>
              <h3 class="bento-title">Backend & Distributed Systems</h3>
              <p class="bento-desc">Reliable APIs, microservices, and database architectures engineered to stay fast and never collapse under load.</p>
              <span class="bento-meta">Node.js &middot; Python &middot; PostgreSQL &middot; Redis &middot; GraphQL</span>
            </div>
          </article>

          <!-- Bottom Row: Card 3 (Tall/Square), Middle Stack (Card 4 & Card 6), Card 5 (Tall) -->
          <article class="bento-box bento-box-3">
            <div class="bento-box-inner">
              <span class="bento-tag">Design</span>
              <h3 class="bento-title">UI / UX & Branding</h3>
              <p class="bento-desc">Interfaces with character and polish. We design digital products that users remember, interact with, and genuinely love using.</p>
              <span class="bento-meta">Figma &middot; Design Systems</span>
            </div>
          </article>

          <div class="bento-middle-stack">
            <article class="bento-box bento-box-4">
              <div class="bento-box-inner">
                <span class="bento-tag tag-urgent">Rapid Response</span>
                <h3 class="bento-title">24/7 Midnight Rescue</h3>
                <p class="bento-desc">When production breaks at midnight, we step in and fix the root cause immediately.</p>
              </div>
            </article>

            <article class="bento-box bento-box-6">
              <div class="bento-box-inner">
                <span class="bento-tag">Infra</span>
                <h3 class="bento-title">Cloud & DevOps</h3>
                <p class="bento-desc">Zero-downtime CI/CD pipelines, Docker containerization, and automated cloud deployments.</p>
              </div>
            </article>
          </div>

          <article class="bento-box bento-box-5">
            <div class="bento-box-inner">
              <span class="bento-tag">Lifecycle</span>
              <h3 class="bento-title">Post-Deployment Care</h3>
              <p class="bento-desc">We never abandon code. Continuous monitoring, performance tuning, vulnerability patching, and infrastructure scaling long after release.</p>
              <span class="bento-meta">Uptime 99.99% &middot; Maintenance</span>
            </div>
          </article>
        </div>
      </section>

      <!-- Meet Our Team Section (100% Vector Precision) -->
      <section class="team-section" id="team">
        <div class="section-header-wrap text-center">
          <h2 class="section-heading">Meet our team</h2>
        </div>

        <div class="team-composition-wrap">
          <svg viewBox="0 2480 1728 860" width="100%" height="auto" class="team-svg-canvas" fill="none">
            <!-- Center Handshake Photo -->
            <image id="team-stage-img" href="assets/team-dark.png" x="244" y="2571" width="1203" height="737" preserveAspectRatio="xMidYMid meet" />
            <!-- Jayadithya arrow from Santhanam shoulder to label -->
            <path d="{d['p21']}" fill="#945DF7" />
            <!-- Jayadithya Officer text label -->
            <path d="{d['p19']}" class="team-text-glyph" fill="currentColor" />
            <!-- Gurubaravikkram arrow from Karthi shoulder to label -->
            <path d="{d['p22']}" fill="#945DF7" />
            <!-- Gurubaravikkram Md sir text label -->
            <path d="{d['p20']}" class="team-text-glyph" fill="currentColor" />
          </svg>
        </div>
      </section>

      <!-- Real Stories From Clients Section -->
      <section class="stories-section" id="testimonials">
        <div class="stories-header">
          <h2 class="section-heading stories-title">
            Real <em>stories</em><br>from clients
          </h2>

          <div class="carousel-controls" aria-label="Testimonial navigation">
            <button class="arrow-btn" id="prev-testimony" aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button class="arrow-btn" id="next-testimony" aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div class="stories-body">
          <!-- Big Bleeding Alpha Logo on Left -->
          <div class="alpha-backdrop-wrap">
            <img src="assets/logo.png" alt="" class="alpha-bleed-img" width="1331" height="1331" aria-hidden="true">
          </div>

          <!-- Testimonial Cards on Right -->
          <div class="cards-grid" id="testimonials-grid">
            <!-- Priya Card -->
            <div class="story-card" data-index="0">
              <img src="assets/card-border-1.svg" alt="" class="card-squiggly-border" aria-hidden="true">
              <div class="story-card-content">
                <blockquote class="story-quote">
                  "The website they designed for us totally exceeded our expectations."
                </blockquote>
                <div class="story-author">
                  <div class="author-circle" aria-hidden="true"></div>
                  <div class="author-details">
                    <span class="author-name">Priya</span>
                    <span class="author-city">chennai</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Jackson Card -->
            <div class="story-card" data-index="1">
              <img src="assets/card-border-2.svg" alt="" class="card-squiggly-border" aria-hidden="true">
              <div class="story-card-content">
                <blockquote class="story-quote">
                  "when my backend cracked , it was midnight and fixed it asap. love the team!"
                </blockquote>
                <div class="story-author">
                  <div class="author-circle" aria-hidden="true"></div>
                  <div class="author-details">
                    <span class="author-name">Jackson</span>
                    <span class="author-city">austin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer & CTA Section (HEY, WHO ARE WE?) -->
      <section class="footer-cta-stage" id="contact">
        <svg viewBox="0 4200 1728 1385" width="100%" height="auto" class="footer-svg-canvas" fill="none">
          <!-- Dynamic Angled Yellow & Red Comic Beam -->
          <path d="{d['p24']}" fill="#FCEF03" />
          <path d="{d['p25']}" fill="#F10307" />
          <!-- Comic Text: HEY, WHO ARE WE? -->
          <path d="{d['p26']}" fill="#000000" />
          <path d="{d['p27']}" fill="#D6B232" />

          <!-- Anirudh with mic touching the beam tip at (256.5, 4894.1) -->
          <image href="assets/anirudh.png" x="-159" y="4547" width="875" height="1094" />

          <!-- Alpha Logo & Brand Name under the beam -->
          <image href="assets/logo.png" x="814" y="4843.73" width="175.214" height="175.214" />
          <path d="{d['p23']}" class="footer-brand-glyph" fill="currentColor" />

          <!-- Clickable Starburst: Mail us -->
          <a href="mailto:contact@alphacube.dev" class="svg-action-link" aria-label="Mail us at contact@alphacube.dev">
            <g class="starburst-group">
              <path d="{d['p28']}" fill="#945DF7" />
              <path d="{d['p29']}" fill="#00D17C" />
              <path d="{d['p30']}" fill="#458BF9" />
              <image href="assets/mail-icon.png" x="732" y="5225" width="100" height="100" />
              <path d="{d['p31']}" fill="#FFFFFF" />
            </g>
          </a>

          <!-- Clickable Starburst: Call us -->
          <a href="tel:+1234567890" class="svg-action-link" aria-label="Call us">
            <g class="starburst-group">
              <path d="{d['p32']}" fill="#458BF9" />
              <path d="{d['p33']}" fill="#945DF7" />
              <path d="{d['p34']}" fill="#00D17C" />
              <image href="assets/phone-icon.png" x="1199" y="5263" width="81" height="81" />
              <path d="{d['p35']}" fill="#FFFFFF" />
            </g>
          </a>
        </svg>

        <footer class="bottom-bar">
          <p class="copyright-text">&copy; 2026 Alpha cube. Full-stack development & post-deployment care.</p>
        </footer>
      </section>
    </main>

    <!-- Contact Dialog Modal -->
    <dialog id="contact-dialog" class="contact-modal" aria-labelledby="modal-heading">
      <div class="modal-box">
        <button id="close-modal" class="close-btn" aria-label="Close dialog">&times;</button>
        <div id="modal-form-view">
          <h3 id="modal-heading" class="modal-title">Get in touch with Alpha cube</h3>
          <p class="modal-sub">Direct line to our lead engineers. We evaluate your stack and reply within 4 hours.</p>

          <form class="contact-form" id="contact-form">
            <label>
              <span>Your Name</span>
              <input type="text" name="name" required placeholder="Santhanam" autocomplete="name">
            </label>
            <label>
              <span>Email Address</span>
              <input type="email" name="email" required placeholder="you@domain.com" autocomplete="email">
            </label>
            <label>
              <span>Project Details</span>
              <textarea name="message" rows="4" required placeholder="What are you building or debugging? How can we help?"></textarea>
            </label>
            <button type="submit" class="submit-btn" id="submit-btn">
              <span class="btn-text">Send Message</span>
              <span class="btn-spinner" aria-hidden="true"></span>
            </button>
          </form>
        </div>

        <div id="modal-success-view" class="modal-success-view" style="display: none;">
          <div class="success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#00D17C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="modal-title">Message Received</h3>
          <p class="modal-sub">Jayadithya or Gurubaravikkram will review your requirements and reach out within 4 hours.</p>
          <button type="button" class="submit-btn" id="close-success-btn">Done</button>
        </div>
      </div>
    </dialog>
  </div>

  <script src="script.js"></script>
</body>
</html>
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated pixel-perfect index.html successfully!")
