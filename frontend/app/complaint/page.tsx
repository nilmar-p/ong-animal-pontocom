"use client";

import { useState } from "react";

type FormState = {
  phone: string;
  subject: string;
  address: string;
  description: string;
  attachments: FileList | null;
  termsAccepted: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

export default function Complaint() {
  const [form, setForm] = useState<FormState>({
    phone: "",
    subject: "",
    address: "",
    description: "",
    attachments: null,
    termsAccepted: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, attachments: (e.target as HTMLInputElement).files }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const phoneDigits = form.phone.replace(/\D/g, "").slice(0, 11);

    const body = {
      phone: phoneDigits || undefined,
      subject: form.subject,
      address: form.address,
      description: form.description,
    };

    try {
      const response = await fetch(`${API_URL}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const msg =
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ?? "Erro ao enviar denúncia.";
        throw new Error(msg);
      }

      setStatus("success");
      setForm({
        phone: "",
        subject: "",
        address: "",
        description: "",
        attachments: null,
        termsAccepted: false,
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message ?? "Erro inesperado. Tente novamente.");
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">

          <h2 className="mb-3">Denuncie maus-tratos</h2>

          <p className="text-muted mb-4">
            Sua denúncia pode salvar uma vida. Todos os relatos são tratados com sigilo.
          </p>

          {status === "success" && (
            <div className="alert alert-success" role="alert">
              ✅ Denúncia enviada com sucesso! Obrigado por ajudar um animal.
            </div>
          )}

          {status === "error" && (
            <div className="alert alert-danger" role="alert">
              ❌ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                <strong>Telefone (opcional):</strong>
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(51) 99999-9999"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                <strong>Tipo da denúncia:</strong>
              </label>
              <select
                className="form-select"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="ABANDONO">Abandono</option>
                <option value="MAUS_TRATOS">Maus-tratos</option>
                <option value="FALTA_DE_ALIMENTACAO">Falta de alimentação</option>
                <option value="FALTA_DE_AGUA">Falta de água</option>
                <option value="CRIACAO_IRREGULAR">Criação irregular</option>
                <option value="VENDA_ILEGAL">Venda ilegal</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                <strong>Local do Ocorrido (endereço, bairro):</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="attachments" className="form-label">
                <strong>Anexar fotos/vídeos:</strong>
              </label>
              <input
                className="form-control"
                type="file"
                id="attachments"
                name="attachments"
                onChange={handleChange}
                multiple
              />
              <div className="form-text">Você pode selecionar múltiplos arquivos.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <strong>Descrição detalhada do caso:</strong>
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows={5}
                value={form.description}
                onChange={handleChange}
                required
                maxLength={300}
              ></textarea>
            </div>

            <div className="form-check my-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                name="termsAccepted"
                checked={form.termsAccepted}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                Concordo com os <strong>Termos</strong> e desejo prosseguir.
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-register w-100 btn-lg p-3"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : "Enviar Denúncia"}
            </button>

          </form>

          <hr className="my-5" />
        </div>
      </div>
    </div>
  );
}