import '../assets/styles/Global.css'
import '../assets/styles/Usuario.css'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import imgProfile from '../assets/img/perfilSemFoto.png'
import "https://code.iconify.design/2/2.1.2/iconify.min.js"

export default function Usuario() {
    return (
        <div>
            <Header />
            <main className='mainUsuario'>
                <section className='sectionUser container'>
                    <div className='boxBtn'>
                        <button>
                            <span className="iconify-inline" data-icon="akar-icons:chevron-left"></span>
                            <p>Voltar</p>
                        </button>
                    </div>
                    <div className='boxProfile'>
                        <div className='boxImage'>
                            <img src={imgProfile} alt="" />
                            <p>Max Emilian Verstappen</p>
                            <div>
                                <button>Editar usuário</button>
                                <button>Deletar usuário</button>
                            </div>
                        </div>
                        <div className='boxData'>
                            <div className='dataLine'>
                                <p>e-mail</p>
                                <p>maxverstappen33@gmail.com</p>
                            </div>
                            <div className='dataLine'>
                                <p>tipo de usuário</p>
                                <p>ADMIN</p>
                            </div>
                            <div className='dataLine'>
                                <p>status</p>
                                <p>Ativo</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}