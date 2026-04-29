// src/pages/Principal.jsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Principal() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const formatarData = (data) => {
    if (!data) return "—";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="card">
          <p style={{ textAlign: "center", color: "#888" }}>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <span className="tag">03</span>
          <h1>Bem-vindo!</h1>
          <p>Seus dados cadastrados</p>
        </div>

        {usuario && (
          <div className="user-info">
            <div className="info-item">
              <span className="info-label">Nome</span>
              <span className="info-value">{usuario.nome}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Sobrenome</span>
              <span className="info-value">{usuario.sobrenome}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Data de Nascimento</span>
              <span className="info-value">{formatarData(usuario.dataNascimento)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">E-mail</span>
              <span className="info-value">{usuario.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">UID</span>
              <span className="info-value uid">{usuario.uid}</span>
            </div>
          </div>
        )}

        <button onClick={handleLogout} className="btn-secondary">
          Sair
        </button>
      </div>
    </div>
  );
}
