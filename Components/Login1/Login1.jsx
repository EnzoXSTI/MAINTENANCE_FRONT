import { useState } from "react";
import css from './Login.module.css';
import Input from "../../Components/Input/Input.jsx";
import Botao from "../../Components/Botao/Botao.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";
import { Link, useNavigate } from "react-router-dom"; // Importei o useNavigate

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(''); // Novo estado para exibir erros

    const navigate = useNavigate();

    async function fazerLogin(e) {
        if (e) e.preventDefault();
        setErro('');

        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', senha);

        try {
            const resposta = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: formData
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                // Salva o token no navegador
                localStorage.setItem('token_maintenance', dados.token);
                // Redireciona para a página principal/dashboard
                navigate('/home');
            } else {
                setErro(dados.error || "Erro ao efetuar login.");
            }
        } catch (error) {
            console.error("Erro:", error);
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

                    <p className={css.subtitulo}>faça seu login</p>

                    <div className={css.campos}>
                        <Input
                            label="E-mail"
                            type="email"
                            input={email}
                            alterarInput={(e) => setEmail(e.target.value)}
                            placeholder="Ex: usuario@gmail.com"
                        />
                        <div>
                            <Input
                                label="Senha"
                                type="password"
                                input={senha}
                                alterarInput={(e) => setSenha(e.target.value)}
                                placeholder="Ex: Senha@123" // Ajustado o placeholder!
                            />
                            {/* Ajuste o link para a rota correta do React */}
                            <Link to="/enviar-codigo" className={css.linkEsqueci}>Esqueci minha senha</Link>
                        </div>
                    </div>

                    {/* Exibe o erro se existir */}
                    {erro && <p style={{ color: 'red', fontSize: '0.85rem', textAlign: 'center' }}>{erro}</p>}

                    <div className={css.areaBotao}>
                        {/* Removi a 'pagina' e adicionei a 'acao' */}
                        <Botao cor="Azul" texto="Entrar" acao={fazerLogin} />
                    </div>

                    <div className={css.footerLogin}>
                        <span>Não tem uma conta ? </span>
                        <Link to="/cadastro" className={css.linkCadastro}>Cadastrar-se</Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}