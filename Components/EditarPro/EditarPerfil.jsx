import { useState } from "react";
import css from './EditarPerfil.module.css';
import Input from "../../Components/Input/Input.jsx";
import InputArquivo from "../../Components/InputArquivo/InputArquivo.jsx";
import Botao from "../../Components/Botao/Botao.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Header from "../../Components/Header/Header.jsx";

export default function EditarPerfil() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    return (
        <div className={css.pagina}>
            <Header />

            <main className={css.secao}>
                <div className={css.conteudo}>

                    <div className={css.logo}>
                        <img src="/logo2.png" alt="Logo" className={css.logoImg} />
                        <span className={css.logoTexto}>MAINTENANCE</span>
                    </div>

                    <p className={css.subtitulo}>Edite seu Perfil</p>

                    <div className={css.campos}>
                        <Input
                            label="Nome"
                            type="text"
                            input={nome}
                            alterarInput={(e) => setNome(e.target.value)}
                            placeholder="Ex: nome sobrenome"
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            input={email}
                            alterarInput={(e) => setEmail(e.target.value)}
                            placeholder="Ex: usuario@gmail.com"
                        />
                        <Input
                            label="Senha"
                            type="password"
                            input={senha}
                            alterarInput={(e) => setSenha(e.target.value)}
                            placeholder="Ex: 1234"
                        />
                        <Input
                            label="Confirmar Senha"
                            type="password"
                            input={confirmarSenha}
                            alterarInput={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Ex: 1234"
                        />
                        <InputArquivo label="Foto de perfil" />
                    </div>

                    <div className={css.botoes}>
                        <Botao cor="Azul" texto="Editar" />
                        <Botao cor="Branco" texto="Voltar para Dashboard" pagina="/home" />
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
