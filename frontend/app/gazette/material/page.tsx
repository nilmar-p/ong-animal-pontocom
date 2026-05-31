import Image from "next/image";
import Link from "next/link";

export default function Material() {
  return (
    <div className="container my-5 gazeta-article">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">

          <header className="mb-4 text-center">

            <h2 className="fw-bold text-dark mb-2">
              Gazeta Animal
            </h2>

            <div className="search-bar mb-4">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Buscar matérias..."
                  aria-label="Buscar"
                />

                <button className="btn btn-outline-dark">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            <hr className="my-3" />

          </header>

          <article>

            <div className="d-flex justify-content-between align-items-center mb-2">

              <h3 className="h4 mb-0 fw-semibold text-dark">
                Cuidados com o seu pet no verão
              </h3>

              <Link
                href="#"
                className="text-secondary ms-3"
                title="Compartilhar"
              >
                <i className="bi bi-share-fill fs-5"></i>
              </Link>

            </div>

            <p className="text-muted small mb-3">
              In mollis, est ut commodo finibus, libero odio tincidunt dolor.
            </p>

            <div className="article-image mb-3">

              <Image
                src="/imgs/cachorro-verao.jpg"
                alt="Cuidados com o seu pet no verão"
                className="img-fluid rounded"
                width={900}
                height={500}
              />

            </div>

            <div className="article-body">

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer maximus sit amet purus in sollicitudin. Sed sit amet
                lorem rutrum, auctor felis quis, ullamcorper dolor.
              </p>

              <p>
                Nullam ex metus, faucibus a lobortis vel, vulputate non risus.
                Morbi eget elementum turpis. Etiam mattis ligula a venenatis
                accumsan.
              </p>

            </div>

            <figure className="my-4">

              <Image
                src="/imgs/cachorro-verao-2.jpeg"
                alt="Imagem ilustrativa"
                className="img-fluid rounded shadow-sm"
                width={900}
                height={500}
              />

              <figcaption className="text-muted small text-center mt-2">
                Nullam ex metus, faucibus a lobortis vel, vulputate non risus.
              </figcaption>

            </figure>

          </article>

        </div>
      </div>
    </div>
  );
}