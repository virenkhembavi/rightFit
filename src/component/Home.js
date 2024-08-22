
export default function Home() {
    const scrollToProduct = () => {
        const productElement = document.getElementById('product');
        productElement.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='Home-Section'>
            <div className="banner-image">
                <h2>Latest Styles</h2>
                <span>At Yesterday's Prices</span>
                <button onClick={scrollToProduct}>BROWSE ALL STYLES</button>
            </div>
        </div >
    )
}
