import "./AddProduct.css"

function AddProduct() {
    return (
        <div className="add-product-cont">
                <h2>Add product</h2>
            <form >
                <div className="inputs">
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div style={{"--n" : "2"}} className="form-group">
                        <div className="category">
                            <label htmlFor="category">Category</label>
                            <input type="text" name="category" id="category" />
                        </div>
                        <div className="subCategory">
                            <label htmlFor="subCategory">Sub Category</label>
                            <input type="text" name="subCategory" id="subCategory" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="quantity">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" name="quantity" id="quantity" />
                        </div>
                        <div className="main-price">
                            <label htmlFor="mainPrice">Main Price</label>
                            <input type="number" name="mainPrice" id="mainPrice" />
                        </div>
                        <div className="sale-price">
                            <label htmlFor="salePrice">Sale Price</label>
                            <input type="number" name="salePrice" id="salePrice" />
                        </div>
                    </div>
                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea style={{backgroundColor : "white"}} name="description" id="description" cols="30" rows="6"></textarea>
                    </div>
                </div>
                <div className="images">
                    <div className="main-img">
                        <img src="" alt="" />
                    </div>
                    <div className="mini-imgs">
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                    <button className="btn-primary" type="button"> <input type="file" name="images" id="images" />Upload Images</button>
                    <small style={{ color: "white", marginTop: "-20px", fontWeight: "bold" }}>Nb : first image will be the main and the cover</small>
                </div>
                <button className="btn-primary">Add product</button>
            </form>
        </div>
    )
}

export default AddProduct