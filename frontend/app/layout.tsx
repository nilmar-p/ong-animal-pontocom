import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>

        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg bg-light shadow-sm">

          <div className="container">

            <Link className="navbar-brand d-flex align-items-center" href="/">

              <Image
                src="/imgs/logo.png"
                alt="logo"
                width={120}
                height={50}
              />

            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="menu">

              <ul className="navbar-nav ms-auto">

                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Início
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/adoption">
                    Adote
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/financial">
                    Doe
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/gazette">
                    Gazeta animal
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/thrift-store">
                    Brechó
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/complaint">
                    Denunciar
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/about">
                    Sobre Nós
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </nav>

        {children}

        {/* FOOTER */}
        <footer className="mt-5 bg-dark text-light py-4">

          <div className="container text-center">

            <div className="mb-3">

              <Image
                src="/imgs/logo.png"
                alt="logo"
                width={120}
                height={60}
              />

            </div>

            <div className="mb-3">

              <a
                href="https://www.facebook.com/onganimalpontocom/?locale=pt_BR"
                target="_blank"
                className="text-light me-2"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/onganimalpontocom/reels/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://youtu.be/NT8s0GE9vZI"
                target="_blank"
                className="text-light"
              >
                <i className="bi bi-youtube"></i>
              </a>

            </div>

            <p className="small mb-4">
              Praesent sit amet sagittis urna, et vehicula sapien.
              Nam rhoncus at augue in sagittis.
            </p>

            <div className="row text-start small">

              <div className="col-6">

                <strong>PRINCIPAIS</strong>

                <br />

                <Link href="/" className="text-light">
                  Início
                </Link>

                <br />

                <Link href="/adoption" className="text-light">
                  Adote agora
                </Link>

                <br />

                <Link href="/gazette" className="text-light">
                  Gazeta animal
                </Link>

                <br />

                <Link href="/about" className="text-light">
                  Sobre Nós
                </Link>

              </div>

              <div className="col-6">

                <strong>COMO AJUDAR</strong>

                <br />

                <Link href="/thrift-store" className="text-light">
                  Brechó
                </Link>

                <br />

                <Link href="/financial" className="text-light">
                  Ser Voluntário
                </Link>

                <br />

                <Link href="/financial" className="text-light">
                  Doação
                </Link>

              </div>

            </div>

            <hr className="border-light my-3" />

            <p className="small mb-0">
              © 2025 | ONG AnimalPonto.com. Todos os direitos reservados.
            </p>

          </div>

        </footer>

      </body>
    </html>
  );
}