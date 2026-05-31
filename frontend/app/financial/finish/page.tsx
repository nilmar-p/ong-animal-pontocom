import Image from "next/image";

export default function Finish() {
  return (
    <div className="container my-5">

      <div className="row justify-content-center">

        <div className="col-md-8 col-lg-7">

          <h2 className="mb-4">Finalizar doação</h2>

          <div className="text-center">

            <h3 className="h5 text-muted mb-3">
              Qr Code
            </h3>

            <Image
              src="https://hexdocs.pm/qr_code/2.2.1/docs/qrcode.svg"
              className="img-fluid my-3 w-75"
              alt="QR Code PIX"
              width={400}
              height={400}
            />

          </div>

          <div className="card bg-light p-3 my-4">

            <div className="pix-key">

              00020126br.gov.bcb.pix0114TEST+55129999990000214TEST-PAYMENTS20400005303986540510.005802BR5909Empresa
              Test6009Sao Paulo62070503***6304TEST

            </div>

          </div>

          <div
            className="alert alert-secondary d-flex align-items-center"
            role="alert"
          >

            <i
              className="bi bi-info-circle-fill flex-shrink-0 me-3"
              style={{ fontSize: "1.5rem" }}
            ></i>

            <div>
              Use o QR Code para realizar a doação no valor de interesse.
              Ele é válido até o final do dia.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}