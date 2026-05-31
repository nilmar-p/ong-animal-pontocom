"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

type Product = {
  id: number;
  name: string;
  price: string;
  photoUrl: string;
  sold: boolean;
};

function formatPrice(price: string) {
  return Number(price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ThriftStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "done">("loading");

  useEffect(() => {
    fetch(`${API_URL}/product-thrift/all`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data.filter((p) => !p.sold));
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  // últimos 3 para o destaque, restante para a grade
  const featured = products.slice(-3).reverse();
  const rest = products.slice(0, -3);

  return (
    <div className="container mt-3">
      <h6 className="fw-bold mb-3">Peças disponíveis</h6>

      {status === "loading" && (
        <p className="text-center text-muted">Carregando produtos...</p>
      )}

      {status === "error" && (
        <div className="alert alert-danger text-center">
          Não foi possível carregar os produtos. Tente novamente mais tarde.
        </div>
      )}

      {/* Bloco de destaque — últimos 3 adicionados */}
      {status === "done" && featured.length > 0 && (
        <div className="row g-2">

          {/* Coluna esquerda: até 3 miniaturas */}
          <div className="col-4 d-flex flex-column justify-content-between">
            {featured.map((product) => (
              <Link href={`/thrift-store/product?id=${product.id}`} key={product.id} className="mb-2 d-block text-decoration-none">
                <div className="item-card">
                  <img
                    src={product.photoUrl}
                    alt={product.name}
                    style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Coluna direita: o mais recente em destaque */}
          <div className="col-8">
            <Link href={`/thrift-store/product?id=${featured[0].id}`} className="text-decoration-none">
              <div className="item-card h-100">
                <img
                  src={featured[0].photoUrl}
                  alt={featured[0].name}
                  style={{ width: "100%", height: "100%", minHeight: 200, objectFit: "cover", borderRadius: 8 }}
                />
                <div className="info">
                  <h6>{featured[0].name}</h6>
                  <p>{formatPrice(featured[0].price)}</p>
                </div>
              </div>
            </Link>
          </div>

        </div>
      )}

      <hr />

      {/* Grade de todos os outros produtos */}
      {status === "done" && rest.length === 0 && products.length === 0 && (
        <p className="text-center text-muted">Nenhum produto disponível no momento.</p>
      )}

      <div className="row mt-3 g-3">
        {rest.map((product) => (
          <div className="col-6" key={product.id}>
            <Link href={`/thrift-store/product?id=${product.id}`} className="text-decoration-none">
              <div className="item-card">
                <img
                  src={product.photoUrl}
                  alt={product.name}
                  style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }}
                />
                <div className="info">
                  <h6>{product.name}</h6>
                  <p>{formatPrice(product.price)}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}