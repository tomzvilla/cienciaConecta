import "../../../css/style.css"

const HeroImage = () => {
    return (
        <div className="hero-image">
            <img src={require("../../../assets/hero.webp")} alt="" className="hero-image__image"/>
        </div>
    );
}

export default HeroImage;