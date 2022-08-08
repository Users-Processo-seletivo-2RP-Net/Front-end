import '../assets/styles/Global.css'
import '../assets/styles/Cadastrar.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import imgRegister from '../assets/img/perfilSemFoto.png'

export default function Cadastrar() {
    return (
        <div>
            <Header />
            <main className='mainCadastro'>
                <section className='sectionRegister container'>
                    <div className='boxRegister'>
                        <h1>Cadastrar um novo usuário</h1>
                        <div>
                            <img src={imgRegister} alt="" />
                            <label for='image'>Adicionar imagem</label>
                            <input type="file" name="" id="image" />
                        </div>
                        <div>
                            <input placeholder='Nome' type="text" />
                            <input placeholder='E-mail' type="text" />
                            <input placeholder='Senha' type="password" />
                            <select>
                                <option value="" disabled selected>Tipo de usuário</option>
                            </select>
                            <select>
                                <option value="" disabled selected>Status</option>
                            </select>
                        </div>
                        <div>
                            <button>Cancelar</button>
                            <button>Cadastrar</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}