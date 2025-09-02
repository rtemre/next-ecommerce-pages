import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import Link from "next/link";
import Image from "next/image";

const Inspiration = () => (
  <Layout>
    <Breadcrumb />
    <section className="page-intro">
      <div className="container">
        <h2>Inspiration</h2>
        <p>Curated looks and seasonal picks to inspire your next outfit.</p>
      </div>
    </section>

    <section className="inspiration-grid">
      <div className="container">
        <div className="products-list">
          <div className="product-item">
            <div className="product__image">
              <Link href="/products">
                <Image src="/images/slide-1.jpg" alt="Streetwear Essentials" fill />
              </Link>
            </div>
            <div className="product__description">
              <h3>Streetwear Essentials</h3>
              <p>Graphic tees, oversized hoodies, and bold colors.</p>
              <Link href="/products" className="btn btn--rounded btn--yellow">Shop the look</Link>
            </div>
          </div>

          <div className="product-item">
            <div className="product__image">
              <Link href="/products">
                <Image src="/images/slide-2.jpg" alt="Office Ready" fill />
              </Link>
            </div>
            <div className="product__description">
              <h3>Office Ready</h3>
              <p>Crisp dress shirts and minimal layers for a sharp look.</p>
              <Link href="/products?type=Dress%20shirts" className="btn btn--rounded btn--yellow">Shop dress shirts</Link>
            </div>
          </div>

          <div className="product-item">
            <div className="product__image">
              <Link href="/products">
                <Image src="/images/featured-3.jpg" alt="Weekend Chill" fill />
              </Link>
            </div>
            <div className="product__description">
              <h3>Weekend Chill</h3>
              <p>Cozy sweatshirts and easy tees in neutral tones.</p>
              <Link href="/products?type=Sweatshirts" className="btn btn--rounded btn--yellow">Shop sweatshirts</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </Layout>
);

export default Inspiration; 