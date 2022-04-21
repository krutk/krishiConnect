import { useRouter } from "next/router";
import baseUrl from "../../utils/baseUrl";
import { useRef, useEffect } from "react";
import { parseCookies } from "nookies";

const Product = ({ product }) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const cookie = parseCookies();
  console.log(cookie);
  // const user = cookie.user ? JSON.parse(cookie.user) : "";
  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }

  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light #00c853 green accent-4">
            Cancel
          </button>
          <button
            className="btn waves-effect waves-light red"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    await res.json();
    router.push("/");
  };
  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.mediaUrl} alt={product.name} style={{ width: "30%" }} />
      <h5>{product.price} per Quintol</h5>
      <input
        type="number"
        style={{ width: "40px", margin: "10px" }}
        min="1"
        placeholder="Quantity"
      />

      <button className="btn waves-effect waves-light #00c853 green accent-4">
        Add
        <i className="material-icons right">add</i>
      </button>

      <p className="left-align">{product.description}</p>
      {/* {user.role != "user" && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light red"
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      )} */}

      {getModal()}
    </div>
  );
};

// export async function getServerSideProps({params:{id}}){

//     const res = await fetch(`http://localhost:3000/api/product/${id}`)
//     const data = await res.json()
//     return{
//         props:{product:data}
//     }
// }

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "625a631be61e48f38943256f" } }],
    fallback: true,
  };
}

export default Product;
