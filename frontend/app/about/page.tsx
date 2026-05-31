import Image from "next/image";

export default function About() {
  return (
    <div className="container my-5">

      <div className="row justify-content-center">

        <div className="col-12">
          <h2 className="mb-4">Sobre Nós</h2>
        </div>

        <div className="col-12 mb-4">

          <Image
            src="/imgs/sobre.webp"
            className="img-fluid rounded"
            alt="Criança brincando com cachorros em um gramado"
            width={1200}
            height={600}
          />

        </div>

        <div className="col-md-9 col-lg-8">

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer maximus sit amet purus in sollicitudin. Sed sit
            amet lorem rutrum, auctor felis quis, ullamcorper dolor.
            Praesent imperdiet ac arcu non pharetra.
          </p>

          <p className="mb-5">
            Nullam ex metus, faucibus a lobortis vel, vulputate non
            risus. Morbi eget elementum turpis. Etiam mattis ligula
            a venenatis accumsan.
          </p>

          <h3 className="mt-5 mb-4">Nossa Equipe</h3>

        </div>

        <div className="col-12">

          <div className="d-flex align-items-center mb-5">

            <a href="#" className="text-secondary me-3">
              <i
                className="bi bi-arrow-left"
                style={{ fontSize: "2rem" }}
              ></i>
            </a>

            <div className="team-slider-wrapper w-100">

              <div className="team-slider">

                <div className="team-card-col text-center">
                  <div className="team-member-placeholder"></div>
                  <p className="mt-2 small mb-0">
                    <strong>Mário Pereira</strong>
                  </p>
                </div>

                <div className="team-card-col text-center">
                  <div className="team-member-placeholder"></div>
                  <p className="mt-2 small mb-0">
                    <strong>Ana Da Silva</strong>
                  </p>
                </div>

                <div className="team-card-col text-center">
                  <div className="team-member-placeholder"></div>
                  <p className="mt-2 small mb-0">
                    <strong>José Teixeira</strong>
                  </p>
                </div>

                <div className="team-card-col text-center">
                  <div className="team-member-placeholder"></div>
                  <p className="mt-2 small mb-0">
                    <strong>Pedro Santos</strong>
                  </p>
                </div>

                <div className="team-card-col text-center">
                  <div className="team-member-placeholder"></div>
                  <p className="mt-2 small mb-0">
                    <strong>Lúcia Ramos</strong>
                  </p>
                </div>

              </div>

            </div>

            <a href="#" className="text-secondary ms-3">
              <i
                className="bi bi-arrow-right"
                style={{ fontSize: "2rem" }}
              ></i>
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}