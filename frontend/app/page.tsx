import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-4">

      <h5>
        <strong>Conheça agora a ONG animal pontocom!</strong>
      </h5>

      <p>
        Somos um grupo de voluntários apaixonados por animais. Desde 2018,
        transformamos vidas, levando amor, cuidado e esperança a animais e
        pessoas. Junte-se a nós e faça parte dessa corrente do bem. Seja um
        colaborador!
      </p>

      <Link href="/about" className="text-decoration-none">
        Leia mais...
      </Link>

      {/* Imagem com botão play */}

      <div className="play-image mt-3">

        <Image
          src="/imgs/animais.jpg"
          className="img-fluid rounded"
          alt="Animais resgatados"
          width={900}
          height={500}
        />

      </div>

      <div className="d-flex gap-2 mt-3">

        <button className="btn btn-primary flex-fill">
          Doe Agora
        </button>

        <button className="btn btn-secondary flex-fill">
          Sobre Nós
        </button>

      </div>

      {/* Colaboradores */}

      <div className="mt-5">

        <h4 className="text-center mb-4">
          Nossos Colaboradores
        </h4>

        <div className="row row-cols-1 row-cols-md-3 g-4">

          <div className="col">

            <div className="card h-100 border-0 shadow-sm">

              <div className="text-center pt-4">

                <Image
                  src="/imgs/Dalva-Donadel.webp"
                  className="rounded-circle shadow-sm"
                  alt="Dalva Donadel"
                  width={150}
                  height={150}
                  style={{ objectFit: "cover" }}
                />

              </div>

              <div className="card-body text-center">

                <h5 className="card-title">
                  Dalva Donadel
                </h5>

                <p className="text-muted mb-3">

                  <i className="bi bi-patch-check-fill text-primary"></i>
                  {" "}
                  Coordenadora de Proteção Animal

                </p>

                <p className="card-text">

                  <i className="bi bi-quote text-primary"></i>
                  {" "}
                  Donec turpis tellus, molestie a nunc porta, interdum
                  imperdiet justo. Aliquam scelerisque eu vel metus pulvinar.

                </p>

                <div className="mt-3">

                  <a href="#" className="text-muted me-2">
                    <i className="bi bi-linkedin"></i>
                  </a>

                  <a href="#" className="text-muted">
                    <i className="bi bi-envelope"></i>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}