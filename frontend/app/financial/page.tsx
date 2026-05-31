import Image from "next/image";
import Link from "next/link";

export default function Financial() {
    return (
        <div className="main-section">

            <Image
                src="/imgs/animais2.jpg"
                alt="Cães resgatados"
                className="img-fluid"
                width={1200}
                height={500}
            />

            <div className="container mt-4">

                <hr />

                <h5>Doe agora</h5>

                <p className="small text-secondary">
                    Venenatis magna, sit amet tempus quam magna eu eros.
                    Maecenas scelerisque congue lectus, id eleifend diam
                    iaculis quis. Suspendisse potenti. Quisque in nunc
                    magna. Integer dignissim tempor nisi congue
                    pellentesque.
                </p>

                <div className="donation-buttons mt-4 d-flex flex-wrap gap-2">

                    <Link href="/financial/finish" className="btn btn-outline-primary">
                        <i className="bi bi-diamond"></i> Doação Pix
                    </Link>

                    <Link href="/#" className="btn btn-outline-primary">
                        <i className="bi bi-bank"></i> Transf. Bancária
                    </Link>

                    <Link href="/#" className="btn btn-outline-primary">
                        <i className="bi bi-box-seam"></i> Doe Insumos
                    </Link>

                    <Link href="/#" className="btn btn-outline-primary">
                        <i className="bi bi-people"></i> Voluntariar-se
                    </Link>

                </div>

            </div>

        </div>
    );
}