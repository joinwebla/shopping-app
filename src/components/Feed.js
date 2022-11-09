import { useEffect, useState } from "react"
import axios from "axios";

export const Feed = () => {
    const [products, setProducts] = useState([]); //total
    const [cartProducts, setCartProducts] = useState([]); //cart added
    const [cartProductIds, setCartProductIDs] = useState([]); //ids

    const loadProducts = () => {
        const token = localStorage.getItem("SHOPPING_TOKEN");

        axios({
            method: 'GET',
            url: "http://18.183.45.219:3000/api/v1/products",
            headers: {
                "X-Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            setProducts(res.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    const loadCart = () => {
        const cart_id = localStorage.getItem("SHOOPING_CART_ID");
        const token = localStorage.getItem("SHOPPING_TOKEN");

        axios({
            method: "GET",
            url: `http://18.183.45.219:3000/api/v1/carts/${cart_id}`,
            headers: {
                "X-Authorization": `Bearer ${token}`
            } 
        }).then((response) => {
            setCartProductIDs(response.data.map((prod) => prod.id))
            setCartProducts(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        loadProducts()
        loadCart()
    }, [])

    const addToCart = (product_id) => {
        const productID = product_id;
        const cart_id = localStorage.getItem("SHOOPING_CART_ID");
        const token = localStorage.getItem("SHOPPING_TOKEN");

        axios({
            method: "POST",
            url: `http://18.183.45.219:3000/api/v1/carts/${cart_id}`,
            headers: {
                "X-Authorization": `Bearer ${token}`
            },
            data: {
                id: productID,
                "quantity": 1
            }
        }).then((res) => {
            setCartProductIDs([...cartProductIds, productID])
        }).catch((err) => {
            console.log(err);
        })
    }

    return(
        <>
            <h1>Please select Products</h1>
            <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem("SHOPPING_TOKEN")
                localStorage.removeItem("SHOOPING_CART_ID")
                window.location.href = "/login"
            }}>Logout</button>

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                    products.map((product, index) => {
                        return(
                            <div key={index} className="card" style={{width: '18rem', height: 500, margin: 10}}>
                                <img className="card-img-top" style={{height: 200}} src={product.images ? product.images[0] : ''} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">{product.price}/-</p>
                                    {
                                        cartProductIds.includes(product.id) ?(
                                            <button className="btn btn-success">Added</button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={() => {addToCart(product.id)}}>Add to cart</button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}