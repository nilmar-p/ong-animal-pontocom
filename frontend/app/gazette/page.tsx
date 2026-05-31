import Image from "next/image";
import Link from "next/link";

export default function Gazette() {
  return (
    <div className="container my-5">

      <h2 className="mb-4">Gazeta Animal</h2>

      <div className="row align-items-center mb-3">

        <div className="col-md-6">
          <h3 className="h4">Artigos</h3>
        </div>

        <div className="col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar"
            aria-label="Buscar"
          />
        </div>

      </div>

      <div className="container mt-4 mb-4 mobile-news">

        <h2 className="text-center fw-bold mb-3">
          Últimas matérias
        </h2>

        <div className="row g-3">

          <div className="col-12">

            <div className="article-card bg-light p-2 rounded shadow-sm">

              <Link href="/gazette/material">

                <Image
                  src="/imgs/sobre.webp"
                  alt="Matéria 1"
                  className="img-fluid rounded mb-2"
                  width={800}
                  height={400}
                />

                <h5 className="fw-semibold mb-1">
                  Cuidados com o seu pet no verão
                </h5>

                <p className="text-muted small mb-0">
                  Saiba como proteger seu animal de estimação do calor
                  intenso e manter o bem-estar durante o verão.
                </p>

              </Link>

            </div>

          </div>

          <div className="col-12">

            <div className="article-card bg-light p-2 rounded shadow-sm">

              <Image
                src="/imgs/materias/materia2.jpg"
                alt="Matéria 2"
                className="img-fluid rounded mb-2"
                width={800}
                height={400}
              />

              <h5 className="fw-semibold mb-1">
                Vacinas essenciais para cães e gatos
              </h5>

              <p className="text-muted small mb-0">
                Entenda quais vacinas são indispensáveis para prevenir
                doenças comuns e proteger seu pet.
              </p>

            </div>

          </div>

          <div className="col-12">

            <div className="article-card bg-light p-2 rounded shadow-sm">

              <Image
                src="/imgs/materias/materia3.jpg"
                alt="Matéria 3"
                className="img-fluid rounded mb-2"
                width={800}
                height={400}
              />

              <h5 className="fw-semibold mb-1">
                Adoção responsável: o que saber antes de adotar
              </h5>

              <p className="text-muted small mb-0">
                Dicas importantes para garantir que a adoção seja
                uma experiência positiva para você e o animal.
              </p>

            </div>

          </div>

        </div>

      </div>

      <hr className="my-4" />

    </div>
  );
}