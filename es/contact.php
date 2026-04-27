<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contacto | Cursos de polaco para hispanohablantes | Viva Polaco</title>
    <meta
      name="description"
      content="Contacta con Viva Polaco y recibe una propuesta de curso de polaco adaptada a tu objetivo: vida en Polonia, trabajo, estudios o examen."
    />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="Viva Polaco" />
    <link rel="canonical" href="https://teatrodeidiomas.pl/hispano-polaco/es/contact.php" />
    <link rel="alternate" hreflang="es" href="https://teatrodeidiomas.pl/hispano-polaco/es/contact.php" />
    <link rel="alternate" hreflang="pl" href="https://teatrodeidiomas.pl/hispano-polaco/pl/kontakt.php" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:title" content="Contacto | Cursos de polaco para hispanohablantes" />
    <meta
      property="og:description"
      content="Escríbenos y te ayudaremos a elegir el mejor curso de polaco según tu situación."
    />
    <meta property="og:url" content="https://teatrodeidiomas.pl/hispano-polaco/es/contact.php" />
    <meta property="og:site_name" content="Viva Polaco" />
    <meta
      property="og:image"
      content="https://teatrodeidiomas.pl/hispano-polaco/assets/img/og-viva-polaco.jpg"
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Contacto | Cursos de polaco para hispanohablantes"
    />
    <meta
      name="twitter:description"
      content="Consulta gratuita y propuesta de curso adaptada a tus objetivos."
    />
    <meta
      name="twitter:image"
      content="https://teatrodeidiomas.pl/hispano-polaco/assets/img/og-viva-polaco.jpg"
    />
    <meta name="theme-color" content="#d85f45" />
    <link rel="stylesheet" href="/hispano-polaco/assets/css/style.css" />
    <link rel="icon" type="image/svg+xml" href="/hispano-polaco/assets/img/favicon.svg" />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto Viva Polaco",
        "url": "https://teatrodeidiomas.pl/hispano-polaco/es/contact.php",
        "mainEntity": {
          "@type": "Organization",
          "name": "Viva Polaco",
          "telephone": "+48 576 471 021",
          "email": "teatrocontactwarsaw@gmail.com"
        }
      }
    </script>
  </head>
  <body>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/hispano-polaco/es/">
          <span class="brand-mark">VP</span>
          <span class="brand-copy">
            <strong>Viva Polaco</strong>
            <span>Escuela de polaco para hispanohablantes</span>
          </span>
        </a>
        <input class="nav-toggle" id="nav-toggle" type="checkbox" />
        <label class="nav-toggle-btn" for="nav-toggle" aria-label="Abrir menú"><span></span></label>
        <nav class="nav" aria-label="Navegación principal">
          <a href="/hispano-polaco/es/">Inicio</a>
          <a href="/hispano-polaco/es/about.html">Sobre nosotros</a>
          <a href="/hispano-polaco/es/offer.html">Cursos</a>
          <a href="/hispano-polaco/es/faq.html">FAQ</a>
          <a class="active" href="/hispano-polaco/es/contact.php">Contacto</a>
        </nav>
        <div class="header-actions"><div class="lang-switch"><a class="active" href="/hispano-polaco/es/contact.php">ES</a><a href="/hispano-polaco/pl/kontakt.php">PL</a></div></div>
      </div>
    </header>
    <main>
      <section class="section">
        <div class="container contact-grid">
          <article class="contact-card">
            <span class="eyebrow">Contacto</span>
            <h1>Cuéntanos qué necesitas y preparamos una ruta clara.</h1>
            <p>Podemos ayudarte si vienes a Polonia, si ya vives aquí o si necesitas polaco para trabajo, estudios o examen.</p>
            <div class="contact-links">
              <a class="contact-link" href="tel:+48576471021"><strong>Teléfono</strong><span>+48 576 471 021</span></a>
              <a class="contact-link" href="mailto:teatrocontactwarsaw@gmail.com"><strong>E-mail</strong><span>teatrocontactwarsaw@gmail.com</span></a>
            </div>
            <div class="social-row">
              <a class="social-pill" href="https://wa.me/48576471021" target="_blank" rel="noopener noreferrer">WA</a>
              <a class="social-pill" href="https://www.instagram.com/teatrodeidiomas/" target="_blank" rel="noopener noreferrer">IG</a>
              <a class="social-pill" href="https://www.facebook.com/p/Teatro-de-idiomas-61573960503867/" target="_blank" rel="noopener noreferrer">FB</a>
            </div>
          </article>
          <div class="contact-form card">
            <?php if (isset($_GET['sent'])): ?>
              <div class="form-success">Gracias. Hemos recibido tu mensaje y responderemos pronto.</div>
            <?php else: ?>
              <form id="contactForm" action="send.php" method="POST" novalidate>
                <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off" />
                <input type="hidden" name="form_time" value="<?php echo time(); ?>" />
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Nombre y apellido</label>
                    <input id="name" name="name" type="text" autocomplete="name" />
                    <small class="error"></small>
                  </div>
                  <div class="form-group">
                    <label for="email">Correo</label>
                    <input id="email" name="email" type="email" autocomplete="email" />
                    <small class="error"></small>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input id="phone" name="phone" type="tel" autocomplete="tel" />
                    <small class="error"></small>
                  </div>
                  <div class="form-group">
                    <label for="level">Nivel u objetivo</label>
                    <select id="level" name="level">
                      <option value="">Selecciona una opción</option>
                      <option>A1 - empezar desde cero</option>
                      <option>A2-B1 - comunicarme mejor</option>
                      <option>B2-C1 - trabajo o estudios</option>
                      <option>Preparación a examen</option>
                      <option>No lo sé todavía</option>
                    </select>
                    <small class="error"></small>
                  </div>
                </div>
                <div class="form-group">
                  <label for="message">Mensaje</label>
                  <textarea id="message" name="message"></textarea>
                  <small class="error"></small>
                </div>
                <button class="btn btn-primary" type="submit">Enviar mensaje</button>
              </form>
            <?php endif; ?>
          </div>
        </div>
      </section>
    </main>
    <footer class="site-footer"><div class="container footer-inner"><div><strong>Viva Polaco</strong><div>Escuela online de polaco para hispanohablantes</div></div><div class="footer-links"><a href="/hispano-polaco/es/privacy-policy.html">Privacidad</a><a href="/hispano-polaco/es/offer.html">Cursos</a></div></div></footer>
    <script src="/hispano-polaco/assets/js/site.js" defer></script>
  </body>
</html>
