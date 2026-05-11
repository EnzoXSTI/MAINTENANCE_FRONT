import { useState } from 'react'
import css from './InputArquivo.module.css'

export default function InputArquivo({ required = false, alterarInput, label = "Foto de Perfil" }) {

    const [nomeArquivo, setNomeArquivo] = useState('')

    function handleChange(e) {
        const file = e.target.files[0]
        if (file) {
            setNomeArquivo(file.name)
        }
        if (alterarInput) alterarInput(e)
    }

    return (
        <div className={css.inputGroup}>
            <label className={css.label}>
                {label}
            </label>
            <label className={css.botao}>
                {nomeArquivo ? (
                    <span className={css.nomeArquivo}>{nomeArquivo}</span>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaaaaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16"/>
                        <line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                    </svg>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className={css.inputFile}
                />
            </label>
        </div>
    )
}
