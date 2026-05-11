import { useState } from "react";
import css from './RedefinirSenha.module.css';
import Input from "../../Components/Input/Input.jsx";
import Botao from "../../Components/Botao/Botao.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

export default function RedefinirSenha() {
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');

    const navigate = useNavigate();

    async function alterarSenha(e) {
        if (e) e.preventDefault();
        setErro('');
        setMensagem('');

        const email = localStorage.getItem('email_recuperacao');

        if (!email) {
            setErro("Sessão expirada. Solicite o código novamente.");
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('confirmar_senha', confirmarSenha);

        try {
            // OBS: Verifique o nome exato da rota no seu view.py
            const resposta = await fetch('http://localhost:5000/redefinir_senha', {
                method: 'POST',
                body: formData
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                setMensagem("Senha alterada com sucesso!");
                // Limpa o email do localStorage por segurança
                localStorage.removeItem('email_recuperacao');

                setTimeout(() => {
                    navigate('/'); // Volta para o Login
                }, 2000);
            } else {
                setErro(dados.error || "Erro ao alterar a senha.");
            }
        } catch (error) {
            setErro("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className={css.pagina}>
            <Header />
            <main className={css.secao}>
                <div className={css.conteudo}>
                    <div className={css.logo}>
                        <img src="/logo2.png" alt="Logo" className={css.logoImg} />
                        <span className={css.logoTexto}>MAINTENANCE</span>
                    </div>

                    <h2 className={css.titulo}>Redefinir senha</h2>
                    <p className={css.descricao}>Digite a nova senha abaixo e confirme para concluir a recuperação.</p>

                    <div className={css.campos}>
                        <Input
                            label="Nova Senha"
                            type="password"
                            input={senha}
                            alterarInput={(e) => setSenha(e.target.value)}
                            placeholder="Ex: Senha@123"
                        />
                        <Input
                            label="Confirmar Senha"
                            type="password"
                            input={confirmarSenha}
                            alterarInput={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Ex: Senha@123"
                        />
                    </div>

                    {erro && <p style={{ color: 'red', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}
                    {mensagem && <p style={{ color: '#5aabdd', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>{mensagem}</p>}

                    <Botao cor="Azul" texto="Alterar senha" acao={alterarSenha} />
                </div>
            </main>
            <Footer />
        </div>
    );
}