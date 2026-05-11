import { useState, useEffect } from "react";
import css from './VerificacaoCodigo.module.css';
import Input from "../../Components/Input/Input.jsx";
import Botao from "../../Components/Botao/Botao.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

export default function VerificacaoCodigo() {
    const [codigo, setCodigo] = useState('');
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    async function verificarCodigo(e) {
        if (e) e.preventDefault();
        setErro('');
        setMensagem('');

        // Resgata o e-mail que salvamos na tela anterior
        const email = localStorage.getItem('email_recuperacao');

        if (!email) {
            setErro("E-mail não encontrado. Volte e solicite o código novamente.");
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('codigo', codigo);

        try {
            // OBS: Verifique o nome exato da rota no seu view.py
            const resposta = await fetch('http://localhost:5000/verificar_codigo', {
                method: 'POST',
                body: formData
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                setMensagem("Código verificado com sucesso!");
                setTimeout(() => {
                    // Se for recuperação de senha, vai para redefinir.
                    // Se for confirmação de cadastro, pode ir para o /home
                    navigate('/redefinir-senha');
                }, 1500);
            } else {
                setErro(dados.error || "Código inválido ou expirado.");
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
                    </div>

                    <h2 className={css.titulo}>Verificação de código</h2>
                    <p className={css.descricao}>Enviamos um código de 6 dígitos para o seu e-mail. Digite abaixo para continuar.</p>

                    <div className={css.campos}>
                        <Input
                            type="text"
                            input={codigo}
                            alterarInput={(e) => setCodigo(e.target.value)}
                            placeholder="Ex: 123456"
                        />
                    </div>

                    {erro && <p style={{ color: 'red', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}
                    {mensagem && <p style={{ color: '#5aabdd', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>{mensagem}</p>}

                    <div className={css.botoes}>
                        {/* Trocamos a 'pagina' pela 'acao' */}
                        <Botao cor="Azul" texto="Verificar código" acao={verificarCodigo} />
                        <Botao cor="Branco" texto="Mudar E-mail" pagina="/enviar-codigo" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}