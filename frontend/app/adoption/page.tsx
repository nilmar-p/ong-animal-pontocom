"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005";

type Animal = {
  id: number;
  name: string;
  photoUrl: string;
  breed: { name: string };
};

const cardBgs = ["bg-azul", "bg-azul-escuro"];

export default function Adoption() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "done">("loading");

  useEffect(() => {
    fetch(`${API_URL}/animal/all`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        console.log("animais:", data);
        setAnimals(data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="container mt-4 mobile-animals mb-4">
      <div className="section-title text-center mb-3">
        <h2>Nossos Amiguinhos 🐾</h2>
        <p className="subtitle">Conheça alguns dos pets mais fofos do abrigo</p>
      </div>

      {status === "loading" && (
        <p className="text-center text-muted">Carregando animais...</p>
      )}

      {status === "error" && (
        <div className="alert alert-danger text-center">
          Não foi possível carregar os animais. Tente novamente mais tarde.
        </div>
      )}

      {status === "done" && animals.length === 0 && (
        <p className="text-center text-muted">Nenhum animal disponível no momento.</p>
      )}

      <div className="row g-3">
        {animals.map((animal, index) => (
          <div className="col-6" key={animal.id} data-animal>
            <Link
              href={`/interest?animalId=${animal.id}&animalName=${encodeURIComponent(animal.name)}&animalPhoto=${encodeURIComponent(animal.photoUrl)}`}
            >
              <div className={`animal-card ${cardBgs[index % 2]}`}>
                {animal.photoUrl && (
                  <img
                    src={animal.photoUrl}
                    alt={animal.name}
                    width={300}
                    height={200}
                    style={{ objectFit: "cover", width: "100%", height: 200 }}
                  />
                )}
                <div className="info">
                  <p className="nome">{animal.name}</p>
                  <small>{animal.breed?.name ?? "Sem raça definida"}</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}