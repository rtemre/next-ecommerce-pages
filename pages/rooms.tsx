import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import Link from "next/link";
import Image from "next/image";

const Rooms = () => (
  <Layout>
    <Breadcrumb />
    <section className="page-intro">
      <div className="container">
        <h2>Rooms</h2>
        <p>Outfit ideas by occasion and setting. Shop curated picks by room.</p>
      </div>
    </section>

    <section className="rooms-grid">
      <div className="container">
        <div className="products-list">
          <div className="product-item">
            <div className="product__image">
              <Link href="/products?type=Dress%20shirts">
                <Image src="/images/featured-1.jpg" alt="Boardroom" fill />
              </Link>
            </div>
            <div className="product__description">
              <h3>Boardroom</h3>
              <p>Crisp shirts and refined layers for formal meetings.</p>
              <Link href="/products?type=Dress%20shirts" className="btn btn--rounded btn--yellow">Shop boardroom</Link>
            </div>
          </div>

          <div className="product-item">
            <div className="product__image">
              <Link href="/products?type=Sweatshirts">
                <Image src="/images/featured-2.jpg" alt="Lounge" fill />
              </Link>
            </div>
            <div className="product__description">
              <h3>Lounge</h3>
              <p>Relaxed fits and soft fabrics for staying in.</p>
              <Link href="/products?type=Sweatshirts" className="btn btn--rounded btn--yellow">Shop lounge</Link>
            </div>
          </div>

          <div className="product-item">
            <div className="product__image">
              <Link href="/products?type=T-Shirts">
                <Image src="/images/featured-3.jpg" alt="Studio" fill />
              </Link>
            </div>
            <div className="product__description">
              <h3>Studio</h3>
              <p>Tees and tanks that move with you during workouts.</p>
              <Link href="/products?type=Tank%20Tops" className="btn btn--rounded btn--yellow">Shop studio</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </Layout>
);

export default Rooms; 