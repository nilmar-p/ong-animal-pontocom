"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  photoUrl: string;
  sold: boolean;
};

type FormState = {
  interested: string;
  phone: string;
};

function formatPrice(price: string) {
  const n = Number(price);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatInstallment(price: string) {
  const n = Number(price) / 2;
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Product() {
  const params = useSearchParams();
  const productId = params.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loadStatus, setLoadStatus] = useState<"loading" | "error" | "done">("loading");

  const [form, setForm] = useState<FormState>({ interested: "", phone: "" });
  const [orderStatus, setOrderStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!productId) return;

    Promise.all([
      fetch(`${API_URL}/product-thrift/${productId}`).then((r) => r.json()),
      fetch(`${API_URL}/product-thrift/all`).then((r) => r.json()),
    ])
      .then(([prod, all]: [Product, Product[]]) => {
        setProduct(prod);
        setRelated(all.filter((p) => p.id !== prod.id && !p.sold).slice(0, 4));
        setLoadStatus("done");
      })
      .catch(() => setLoadStatus("error"));
  }, [productId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleBuy() {
    if (!form.interested || !form.phone) {
      setOrderStatus("error");
      setErrorMessage("Preencha seu nome e Whatsapp para continuar.");
      return;
    }

    setOrderStatus("loading");
    setErrorMessage("");

    const phoneDigits = form.phone.replace(/\D/g, "").slice(0, 11);

    try {
      const response = await fetch(`${API_URL}/order-thrift`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interested: form.interested,
          phone: phoneDigits,
          productId: Number(productId),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const msg = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message ?? "Erro ao registrar pedido.";
        throw new Error(msg);
      }

      setOrderStatus("success");
      setForm({ interested: "", phone: "" });
    } catch (err: any) {
      setOrderStatus("error");
      setErrorMessage(err.message ?? "Erro inesperado. Tente novamente.");
    }
  }

  if (loadStatus === "loading") return <p className="text-center text-muted mt-5">Carregando...</p>;
  if (loadStatus === "error" || !product) return <div className="alert alert-danger m-3">Produto não encontrado.</div>;

  return (
    <div className="container product-container">

      <h6 className="fw-bold">{product.name}</h6>

      <div className="row g-2 align-items-stretch">
        <div className="col-3 d-flex flex-column justify-content-between" style={{ height: "210px" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="thumbnail flex-fill mb-1">
              <img
                src={product.photoUrl}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
              />
            </div>
          ))}
        </div>

        <div className="col-9">
          <div className="main-image h-100">
            <img
              src={product.photoUrl}
              alt={product.name}
              style={{ width: "100%", height: "100%", minHeight: 210, objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-3">
        <div>
          <p className="price mb-0">{formatPrice(product.price)}</p>
          <small className="text-muted">
            2x de {formatInstallment(product.price)} sem juros no cartão
          </small>
        </div>
      </div>

      <p className="mt-3 small">{product.description}</p>

      {/* Formulário de compra */}
      {product.sold ? (
        <div className="alert alert-warning">Este produto já foi vendido.</div>
      ) : (
        <div className="mt-3">
          {orderStatus === "success" && (
            <div className="alert alert-success">✅ Pedido registrado! Em breve entraremos em contato.</div>
          )}
          {orderStatus === "error" && (
            <div className="alert alert-danger">❌ {errorMessage}</div>
          )}

          <div className="mb-2">
            <input
              type="text"
              className="form-control form-control-sm mb-2"
              placeholder="Seu nome"
              name="interested"
              value={form.interested}
              onChange={handleChange}
              maxLength={100}
            />
            <input
              type="tel"
              className="form-control form-control-sm"
              placeholder="Whatsapp (ex: 51 99999-9999)"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-buy px-3 w-100"
            onClick={handleBuy}
            disabled={orderStatus === "loading"}
          >
            {orderStatus === "loading" ? "Enviando..." : "Comprar"}
          </button>
        </div>
      )}

      <hr />

      {/* Produtos relacionados */}
      {related.length > 0 && (
        <div className="row g-3 mt-3">
          {related.map((p) => (
            <div className="col-6" key={p.id}>
              <Link href={`/thrift-store/product?id=${p.id}`} className="text-decoration-none">
                <div className="p-2 border rounded text-center small bg-light">
                  <img
                    src={p.photoUrl}
                    alt={p.name}
                    style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 4, marginBottom: 8 }}
                  />
                  {p.name}
                  <br />
                  <span className="fw-bold">{formatPrice(p.price)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}