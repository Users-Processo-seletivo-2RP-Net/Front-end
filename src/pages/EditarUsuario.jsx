import '../assets/styles/Global.css'
import '../assets/styles/EditarUsuario.css'
import '../assets/styles/Usuario.css'
import imgProfile from '../assets/img/perfilSemFoto.png'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

export default function EditarUsuario() {
    return (
        <div>
            <Header />
            <main className='mainUpdate'>
                <section className='sectionUpdate container'>
                    <div className='boxBtn'>
                        <button>
                            <span className="iconify-inline" data-icon="akar-icons:chevron-left"></span>
                            <p>Voltar</p>
                        </button>
                    </div>
                    <div className='containerUpdate'>
                        <div className='boxUpdateImage'>
                            <div>
                                <img src={imgProfile} alt="" />
                                <label for="image">Substituir imagem</label>
                                <input type="file" id='image'/>
                            </div>
                        </div>
                        <div className='boxUpdateInfo'>
                            <div className='boxInputs'>
                                <div className='updateLine'>
                                    <label htmlFor="">nome</label>
                                    <input type="text" name="" id="" />
                                </div>
                                <div className='updateLine'>
                                    <label htmlFor="">e-mail</label>
                                    <input type="text" name="" id="" />
                                </div>
                                <div className='updateLine'>
                                    <label htmlFor="">tipo de usuário</label>
                                    <select name="" id=""></select>
                                </div>
                                <div className='updateLine'>
                                    <label htmlFor="">status</label>
                                    <select name="" id=""></select>
                                </div>
                            </div>
                            <button>Salvar alterações</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}