"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

type FormState = {
  interested: string;
  email: string;
  phone: string;
};

export default function Interest() {
  const params = useSearchParams();
  const animalId = params.get("animalId");
  const animalName = params.get("animalName") ?? "este animal";
  const animalPhoto = params.get("animalPhoto");

  const [form, setForm] = useState<FormState>({ interested: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const phoneDigits = form.phone.replace(/\D/g, "").slice(0, 11);

    try {
      const response = await fetch(`${API_URL}/adoption-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interested: form.interested,
          email: form.email,
          phone: phoneDigits,
          animalId: Number(animalId),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const msg = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message ?? "Erro ao registrar interesse.";
        throw new Error(msg);
      }

      setStatus("success");
      setForm({ interested: "", email: "", phone: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message ?? "Erro inesperado. Tente novamente.");
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">

          {/* Foto do animal */}
          {animalPhoto && animalPhoto !== "undefined" && (
            <div className="text-center mb-4">
              <img
                src={animalPhoto}
                alt={animalName}
                className="rounded"
                style={{ objectFit: "cover", width: "100%", maxWidth: 320, height: 220 }}
              />
              <p className="mt-2 fw-bold fs-5">{animalName}</p>
            </div>
          )}

          <h2 className="mb-1">Quero adotar! 🐾</h2>
          <p className="text-muted mb-4">
            Preencha seus dados e entraremos em contato para dar continuidade à adoção de{" "}
            <strong>{animalName}</strong>.
          </p>

          {status === "success" && (
            <div className="alert alert-success" role="alert">
              ✅ Interesse registrado com sucesso! Em breve entraremos em contato.
            </div>
          )}

          {status === "error" && (
            <div className="alert alert-danger" role="alert">
              ❌ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="interested" className="form-label">
                <strong>Seu nome:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="interested"
                name="interested"
                value={form.interested}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <strong>E-mail:</strong>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                maxLength={100}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                <strong>Telefone:</strong>
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="(51) 99999-9999"
              />
            </div>

            <button
              type="submit"
              className="btn btn-register w-100 btn-lg p-3"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : "Registrar Interesse"}
            </button>

          </form>

          <hr className="my-5" />
        </div>
      </div>
    </div>
  );
}