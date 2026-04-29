// src/pages/Cadastro.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import "../styles/global.css";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    dataNascimento: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid,
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento,
        email: form.email,
      });

      setSucesso("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está cadastrado.");
      } else if (error.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setErro("Erro ao cadastrar: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <span className="tag">01</span>
          <h1>Cadastro</h1>
          <p>Crie sua conta para continuar</p>
        </div>

        <form onSubmit={handleCadastro} className="form">
          <div className="field-row">
            <div className="field">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="field">
              <label>Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                placeholder="Seu sobrenome"
                required
              />
            </div>
          </div>

          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="field">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="field">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>

          {erro && <p className="msg-erro">{erro}</p>}
          {sucesso && <p className="msg-sucesso">{sucesso}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="card-footer">
          <p>
            Já tem conta? <Link to="/login">Acessar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
