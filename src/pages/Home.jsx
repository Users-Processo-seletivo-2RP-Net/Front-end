import '../assets/styles/Global.css'
import '../assets/styles/Home.css'
import imgService1 from '../assets/img/services1.jpg'
import imgService2 from '../assets/img/services2.jpg'
import imgService3 from '../assets/img/services3.jpg'
import imgService4 from '../assets/img/services4.jpg'
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section className='banner'>
          <div className='container'>
            <h1>Gerencie seu time!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere diam quis cursus mollis.</p>
            <button>entrar</button>
          </div>
        </section>
        <section className='services'>
          <div className='container'>
            <h2>Contrua algo novo</h2>
            <div className='servicesArticles'>
              <article>
                <img src={imgService1} alt="" />
                <div>
                  <h3>Lorem Ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere diam quis cursus mollis. Proin tincidunt a sapien et accumsan.</p>
                </div>
              </article>
              <article>
                <img src={imgService2} alt="" />
                <div>
                  <h3>Lorem Ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere diam quis cursus mollis. Proin tincidunt a sapien et accumsan.</p>
                </div>
              </article>
              <article>
                <img src={imgService3} alt="" />
                <div>
                  <h3>Lorem Ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere diam quis cursus mollis. Proin tincidunt a sapien et accumsan.</p>
                </div>
              </article>
              <article>
                <img src={imgService4} alt="" />
                <div>
                  <h3>Lorem Ipsum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere diam quis cursus mollis. Proin tincidunt a sapien et accumsan.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className='about'>
          <div />
          <div>
            <h2>Amplie seu negócio</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere diam quis cursus mollis. Proin tincidunt a sapien et accumsan. Nullam non lobortis turpis. Vivamus sed massa vitae nulla consequat tempor. Donec sodales odio iaculis tempus malesuada. Morbi varius in neque et venenatis. </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


