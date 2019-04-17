import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getProducts, saveProduct, deleteProduct, editProduct } from "./actions/actions";
import './styles/index.css';
import defaultProductImage from './images/default.jpg';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddProductModal: false,
            addName: '',
            addDescription: '',
            addCountry: '',
            addPrice: '',
            addValue: '',
            saveFile: null,
            showEditModal: false,
            editName: '',
            editDescription: '',
            editCountry: '',
            editPrice:'',
            editValue:'',
            editProductId: 0,
            editImage: null,
            editSaveFile: null,
        };
    }
    componentDidMount() {
        this.props.getProducts();
    }
    showAddProductModalEvent() {
        this.setState({
            showAddProductModal: true
        });
    }
    closeAddProductModalEvent() {
        this.setState({
            showAddProductModal: false
        });
    }
    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleAddProductSubmit() {
        const addName = this.state.addName;
        const addDescription = this.state.addDescription;
        const addCountry = this.state.addCountry;
        const addPrice = this.state.addPrice;
        const addValue = this.state.addValue;
        const image = this.state.saveFile;
        this.props.saveProduct(addName, addDescription, addCountry,addPrice,addValue, image,
            () => {
                this.setState({
                    showAddProductModal: false,
                    addName: '',
                    addDescription: '',
                    addCountry: '',
                    addPrice: '',
                    addValue: '',
                    saveFile: null
                });
            });
    }
    handleDelete(deleteId) {
        this.props.deleteProduct(deleteId);
    };
    handleFileChange(event) {
        this.setState({
            saveFile: event.target.files[0],
        });
    }
    handleEdit = (product) => {
        const name = product.name;
        const description = product.description;
        const country = product.country;
        const price = product.price;
        const value = product.value;
        const id = product._id;
        const image = product.image;
        this.setState({
            showEditModal: true,
            editName: name,
            editDescription: description,
            editCountry: country,
            editPrice: price,
            editValue: value,
            editProductId: id,
            editImage: image,
        });
    };
    handleEditShowModal = (event) => {
        event.preventDefault();
        const showEditModal = this.state.showEditModal;
        this.setState({
            showEditModal: !showEditModal,
            editName: '',
            editDescription: '',
            editCountry: '',
            editPrice: '',
            editValue: '',
            editProductId: 0,
        });
    };
    handleEditProduct = (event) => {
        event.preventDefault();
        const editName = this.state.editName;
        const editDescription = this.state.editDescription;
        const editCountry = this.state.editCountry;
        const editPrice = this.state.editPrice;
        const editValue = this.state.editValue;
        const editProductId = this.state.editProductId;
        const editSaveFile = this.state.editSaveFile;
        const updateProduct = {
            name: editName,
            description: editDescription,
            country: editCountry,
            price: editPrice,
            value: editValue,
            file: editSaveFile,
        };
        this.props.editProduct(editProductId, updateProduct, () => {
            this.setState({
                showEditModal: false,
                editName: '',
                editDescription: '',
                editCountry: '',
                editPrice: '',
                editValue: '',
            });
        });
    };
    handleEditFileImage(event) {
        this.setState({
            editSaveFile: event.target.files[0]
        })
    }
    render() {
        const products = this.props.products;
        const addName = this.state.props;
        const addDescription = this.state.props;
        const addCountry = this.state.props;
        const addPrice = this.state.props;
        const addValue = this.state.props;
        const showAddProductModal = this.state.showAddProductModal;
        const showEditModal = this.state.showEditModal;
        const editName = this.state.editName;
        const editDescription = this.state.editDescription;
        const editCountry = this.state.editCountry;
        const editPrice = this.state.editPrice;
        const editValue = this.state.editValue;
        const editImage = this.state.editImage;
        const editSaveFile = this.state.editSaveFile;
        return (
            <div className="px-2 py-2">
                <Header/>
                { showAddProductModal &&
                <div id="myModal" className="mymodal">
                    <div className="mymodal-content">
                        <div className="mymodal-header py-2">
                            <h2>Add new your product</h2>
                            <span className="myclose" onClick={this.closeAddProductModalEvent.bind(this)}>&times;</span>
                        </div>
                        <div className="mymodal-body">
                            <div className="input-group my-3">
                                <input value={addName} onChange={this.handleInputChange.bind(this)} name="addName" type="text" placeholder="Enter name" className="form-control"/>
                            </div>

                            <div className="input-group my-3">
                                <select type="text" className="form-control" name="addCountry" placeholder="country"
                                        onChange={this.handleInputChange.bind(this)}>
                                    <option value={addCountry}>Choose your country</option>
                                    <option value={addCountry}>Kazakhstan</option>
                                    <option value={addCountry}>Russia</option>
                                    <option value={addCountry}>USA</option>
                                </select>
                            </div>
                            <div className="input-group my-3">
                            <input value={addPrice} onChange={this.handleInputChange.bind(this)} name="addPrice" type="text" placeholder="Enter Price" className="form-control"/>
                        </div>
                            <div className="input-group my-3">
                                <select type="text" className="form-control" name="addValue" placeholder="value"
                                        onChange={this.handleInputChange.bind(this)}>
                                    <option value={addValue}>Choose your value</option>
                                    <option value={addValue}>KZT</option>
                                    <option value={addValue}>RUB</option>
                                    <option value={addValue}>$</option>
                                </select>
                            </div>
                            <div className="input-group my-3">
                <textarea value={addDescription} onChange={this.handleInputChange.bind(this)} name="addDescription" placeholder="Enter description" className="form-control">
                </textarea>
                            </div>
                            <div className="input-group mt-3">
                                <input type="file" onChange={this.handleFileChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="mymodal-footer">
                            <div className="my-2 text-right">
                                <button className="btn btn-secondary mr-2" onClick={this.closeAddProductModalEvent.bind(this)}>Cancel</button>
                                <button className="btn btn-primary" onClick={this.handleAddProductSubmit.bind(this)}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
                <div className="mb-2">
                    <button className="btn btn-success" onClick={this.showAddProductModalEvent.bind(this)}>
                        <i className="fas fa-plus"/>
                    </button>
                </div>
                <ul className="list-group">
                    {
                        products.map((product) => {
                            return (
                                <li key={product._id} className="list-group-item" >
                                    { product.image &&
                                    <img src={product.image} alt="Product image"/>
                                    }
                                    { !product.image &&
                                    <img src={defaultProductImage} alt="Product image"/>
                                    }
                                    <p>Product name:{product.name}</p>
                                    <p>Description:{product.description}</p>
                                    <p>Country:{product.country}</p>
                                    <p>Price:{product.price}{product.value}</p>
                                    <p>Date:{product.createdAt}</p>
                                    <button className="btn btn-danger mx-2" onClick={this.handleDelete.bind(this, product._id)}>
                                        <i className="fas fa-trash"/>
                                    </button>
                                    <button className="btn btn-warning" onClick={this.handleEdit.bind(this, product)}>
                                        <i className="fas fa-pencil-alt"/>
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                {showEditModal &&
                <div className="mymodal">
                    <div className="mymodal-content">
                        <div className="mymodal-header py-2">
                            <h2>Edit your product</h2>
                            <span className="myclose" onClick={this.handleEditShowModal.bind(this)}>&times;</span>
                        </div>
                        <div className="mymodal-body">
                            <div className="input-group mt-3">
                                <label htmlFor="editFile">
                                    { editImage &&
                                    <img src={editImage} alt="Product image" className="editProductImage"/>
                                    }
                                    { !editImage &&
                                    <img src={defaultProductImage} alt="Product image" className="editProductImage"/>
                                    }
                                </label>
                                {editSaveFile && <span className="text-success">File chosen!</span>}
                                <input type="file" id="editFile" className="d-none" onChange={this.handleEditFileImage.bind(this)}/>
                            </div>
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" name="editName" placeholder="name"
                                       onChange={this.handleInputChange.bind(this)} value={editName}/>
                            </div>
                            <div className="input-group mt-3">
                                <select  type="text"className="form-control" name="editCountry" placeholder="country"
                                        onChange={this.handleInputChange.bind(this)} value={editCountry}>
                                    <option value="choose">Choose your country</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Russia">Russia</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                            <div className="input-group mt-3">
                                <select type="text" className="form-control" name="editValue" placeholder="value"
                                        onChange={this.handleInputChange.bind(this)} value={editValue}>
                                    <option value="choose">Choose your value</option>
                                    <option value="KZT">KZT</option>
                                    <option value="RUB">RUB</option>
                                    <option value="$">$</option>
                                </select>
                            </div>
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" name="editPrice" placeholder="price"
                                       onChange={this.handleInputChange.bind(this)} value={editPrice}/>
                            </div>
                            <div className="input-group mt-3">
                <textarea type="text" className="form-control" name="editDescription" placeholder="Description..."
                          onChange={this.handleInputChange.bind(this)} value={editDescription}/>
                            </div>
                        </div>
                        <div className="mymodal-footer">
                            <div className="my-2">
                                <button className="btn btn-secondary mr-2" onClick={this.handleEditShowModal.bind(this)}>Cancel</button>
                                <button className="btn btn-success" onClick={this.handleEditProduct.bind(this)}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => {
            dispatch(getProducts())
        },
        saveProduct: (addName, addDescription, addCountry,addPrice,addValue, saveImage, changeState) => {
            dispatch(saveProduct(addName, addDescription, addCountry,addPrice,addValue, saveImage, changeState))
        },
        editProduct: (id, newProduct, changeState) => {
            dispatch(editProduct(id, newProduct, changeState));
        },
        deleteProduct: (id) => {
            dispatch(deleteProduct(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
