import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelServices';
import './addBlock.css';


class AddBlock extends Component {
    state = {
        char5List: [],
        loadedBlock: false,
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    newBlock = (char5List) => {
        this.setState({
            char5List,
            loadedBlock: !this.state.loadedBlock,
            loading: true
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: false
        })
    }

    onBlock = () => {
        if (!this.state.loadedBlock) {
            this.onCharLoading()
            this.marvelService
                .get5Characters()
                .then(this.newBlock)
                .catch(this.onError)
        } else {
            this.setState({
                loadedBlock: !this.state.loadedBlock,
                loading: true
            })
        }
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <div
                    className="block__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="block__name">{item.name}</div>
                </div>
            )
        });
        return (
            <div className="block__items">
                {items}
            </div>
        )
    }
    
    render() {
        const { char5List, loading, error, loadedBlock } = this.state;
        const items = this.renderItems(char5List);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = !loading ? <Spinner /> : null;
        const content = loadedBlock && loading && !error ? items : null;
        
        let buttonBlock = 'Add block';
        if (!loadedBlock ? buttonBlock : buttonBlock = 'Hide block'); 

        return (
            <div className="addBlock">
                {errorMessage}
                {spinner}
                {content} 
                <div className="addBlock__button">
                    <button onClick={this.onBlock} className="button button__main">
                        <div className="inner">{buttonBlock}</div>
                    </button>
                </div>
            </div>
        )
    }
    
}

export default AddBlock;