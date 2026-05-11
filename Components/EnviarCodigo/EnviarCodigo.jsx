import { useState } from "react";
import css from './EnviarCodigo.module.css';
import Input from "../../Components/Input/Input.jsx";
import Botao from "../../Components/Botao/Botao.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";
import { useNavigate } from "react-router-dom"; // Importei o useNavigate

export default function EnviarCodigo() {
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState('');
    const [mensagem, setMensagem] = useState('');

    const navigate = useNavigate();

    async function solicitarCodigo(e) {
        if (e) e.preventDefault();
        setErro('');
        setMensagem('Enviando e-mail...'); // Feedback visual de carregamento

        const formData = new FormData();
        formData.append('email', email);

        try {
            // OBS: Verifique se o nome da sua rota no Flask é exatamente '/esqueci_senha' ou '/enviar_codigo'
            const resposta = await fetch('http://localhost:5000/esqueci_senha', {
                method: 'POST',
                body: formData
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                setMensagem("Código enviado com sucesso!");
                // Aguarda 1 segundo e meio e manda para a tela de verificação
                setTimeout(() => {
                    navigate('/verificacao'); // Ajuste para a rota correta do seu frontend
                }, 1500);
            } else {
                setMensagem('');
                setErro(dados.error || "Erro ao enviar código.");
            }
        } catch (error) {
            setMensagem('');
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

                    <h2 className={css.titulo}>Enviar código para e-mail</h2>
                    <p className={css.descricao}>Informe o e-mail cadastrado para receber o código de recuperação.</p>

                    <div className={css.campos}>
                        <Input
                            type="email"
                            input={email}
                            alterarInput={(e) => setEmail(e.target.value)}
                            placeholder="Ex: usuario@gmail.com"
                        />
                    </div>

                    {erro && <p style={{ color: 'red', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>{erro}</p>}
                    {mensagem && <p style={{ color: '#5aabdd', fontSize: '0.85rem', textAlign: 'center', marginBottom: '10px' }}>{mensagem}</p>}

                    <div className={css.botoes}>
                        {/* Botão agora executa a função */}
                        <Botao cor="Azul" texto="Verificar E-mail" acao={solicitarCodigo} />
                        <Botao cor="Branco" texto="Voltar ao Login" pagina="/" />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}